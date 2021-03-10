import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Password } from '@shared/models/password.model';
import { ConfirmPasswordValidation } from './confirm-password.validation';

@Component({
  selector: 'p2s-chane-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss']
})
export class ChangePasswordPopupComponent implements OnInit {

  formSubmitted = false;

  passwordForm: FormGroup;

  password: Password = new Password();

  showAlert = false;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.passwordForm = this.fb.group(
      {
        userCurrentPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        userNewPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        userConfirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      },
      {
        validator: ConfirmPasswordValidation.MatchPassword
      }
    );
  }

  cancel() {
    this.modal.dismiss();
  }

  save() {
    this.modal.close(this.passwordForm.getRawValue());
  }

  toggleWithGreeting(popover) {
    this.showAlert = true;
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
}
