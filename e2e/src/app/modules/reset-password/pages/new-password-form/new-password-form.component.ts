import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../services/reset-password.service';
import { ToastService } from '@shared/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidation } from 'app/modules/dashboard/pages/change-password-popup/confirm-password.validation';

@Component({
  selector: 'p2s-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.scss']
})
export class NewPasswordFormComponent implements OnInit {

  token: string;

  validToken: boolean = false;

  isError = false;

  error: string;

  userPassword: UserPassword = new UserPassword();

  resetForm: FormGroup;

  
  constructor(
    private activatedRoute: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private toastr: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();

    this.activatedRoute.paramMap.subscribe(params => {
      this.token = params.get("token");
      this.isTokenValid(this.token);
    })
  }


  buildForm() {
    this.resetForm = this.fb.group(
      {
        userNewPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        userConfirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      },
      {
        validator: ConfirmPasswordValidation.MatchPassword
      }
    );
  }
  
  isTokenValid(token) {
    this.resetPasswordService.checkToken(token)
      .subscribe(
        data => {
          this.validToken = true;
          console.log('the data is succeddd',this.validToken);
        },
        error => {
          this.isError = true;
          this.error = 'Error while checking token';
          console.log('the valid token is ', this.validToken, this.isError);
        }
      )
    return this.validToken;
  }

  resetPassword() {
    console.log('the new password',this.userPassword);
    this.resetPasswordService.resetPassword(this.token,this.userPassword)
      .subscribe(
        data => {
          console.log('Password has been changed successfully');
          this.toastr.popSucces('Password has been resetted successfully');
          this.router.navigate(['login']);
        },
        error => {
          console.error('Error while resetting password', error)
        }
      )
    
  }

}

export class UserPassword {
  userNewPassword: string;
  userConfirmPassword: string;
}
