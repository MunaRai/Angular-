import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { LoginService } from 'app/modules/login/services/login.service';

@Component({
  selector: 'p2s-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  emailVerificationError = '';

  emailVerification: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toaster: ToastService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const sub = this.route.params
      .subscribe(params => {
        const code = params['code'];
        this.verifyUserEmail(code);
      });
  }

  verifyUserEmail(code) {
    this.loginService.checkEmailVerification(code)
      .subscribe(
        data => {
          this.emailVerification = true;
          this.router.navigate(['login']);
        },
        error => {
          this.emailVerification = false;
          this.emailVerificationError = 'The User has already been verified!!!';
        }
    )
  }

}
