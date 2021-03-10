import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs/Subscription';
import { ToastService } from '@shared/services/toast.service';
import { UserDetailService } from '@shared/services/user-detail.service';

@Component({
  selector: 'p2s-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  @HostBinding('class')
  class = 'd-flex flex-column col p-0';

  loginForm: FormGroup;

  details: string[] = [];

  loginError: any;

  submitting = false;

  languages: string[] = [
    'English',
    'Spanish',
    'Korean'
  ];

  regions: string[] = [
    'Canada',
    'USA'
  ];

  subscribtion: Subscription;

  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toaster: ToastService,
    private userDetailService: UserDetailService,
  ) { }

  ngOnInit() {
    if (!this.jwtHelper.isTokenExpired()) {
      this.toaster.popWarning(`You're already logged in!`);
      this.router.navigate(['dashboard']);
    }
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login() {
    this.submitting = true;
    this.subscribtion = this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        ({ code, result, meta }) => {
          if (code === 200) {
            this.userDetailService.setUser(meta);
            localStorage.setItem('p2s_access_token', result);
            if (meta.userRole === 'ROLE_SYSTEM') {
              this.router.navigate(['/dashboard/system']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }
        },
        (error) => {
          if (error.code === 423) {
            this.loginError = 'Your IP Is Locked';
          } else if (error.code === 401) {
            this.loginError = 'Your Password Is Incorrect';
          } else if (error.code === 400) {
            this.details = error.result.details;
            this.details = this.details[0].split(',');
            this.loginError = this.details[1];
          }
          this.submitting = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }



}
