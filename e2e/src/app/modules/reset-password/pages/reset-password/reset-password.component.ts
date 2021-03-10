import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../../services/reset-password.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'p2s-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  username: string;

  userError  : boolean = false;

  userErrorMsg = '';

  submitting = false;

  sentMail = true;
  
  constructor(
    private resetPasswordService: ResetPasswordService,
    private toastrService: ToastService
  ) { }

  ngOnInit() {
  }

  sendEmail(username) {
    this.submitting = true;
    this.userErrorMsg = '';
    this.resetPasswordService.sendEmail(username)
      .subscribe(
        data => {
          this.toastrService.popSucces('Email Sent Successfully');
          this.submitting = false;
          this.sentMail = false;
        },
        error => {
          this.userError = true;
          this.submitting = false;
          this.userErrorMsg = 'Username doesnot exists !!!';
        }
      )  
  }


  
}
