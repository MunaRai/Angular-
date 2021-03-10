import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { User } from '@shared/models/user.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ChangePasswordPopupComponent } from '../change-password-popup/change-password-popup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Password } from '@shared/models/password.model';
import { ToastService } from '@shared/services/toast.service';
import { UserProfileService } from '../../services/user-profile.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { logError } from '@shared/helpers/helper';
import { WizardHeaderItem } from '@shared/components/wizard/wizard-types';
import { UserDetailService } from '@shared/services/user-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'p2s-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  user: User;

  @Input()
  data: Password[] = [];

  profileForm: FormGroup;

  profileEditMode = false;

  constructor(
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private toastr: ToastService,
    private userProfileService: UserProfileService,
    private jwtHelper: JwtHelperService,
    private userDetailService: UserDetailService,
    private router: Router
  ) { }

  ngOnInit() {
  //  this.user = this.jwtHelper.decodeToken(localStorage.getItem('p2s_access_token')).user;
    this.userDetailService.getUser()
      .subscribe(
        user => {
          this.user = user;
        }
      );

    this.buildForm();
  }

  buildForm() {
    this.buildProfileForm();
  }

  buildProfileForm() {
    this.profileForm = this.fb.group({
      userFirstName: [this.user.userFirstName, [Validators.required]],
      userMiddleName: this.user.userMiddleName,
      userLastName: [this.user.userLastName, [Validators.required]],
      userEmail: [this.user.userEmail, [Validators.required]],
      userPhone: [this.user.userPhone, [Validators.required]],
      username: [this.user.username, [Validators.required]],
    });
  }

  cancelProfileEdit() {
    this.buildProfileForm();
    this.profileEditMode = false;
  }

  showChangePasswordForm(): void {
    const modal: NgbModalRef = this.modal.open(ChangePasswordPopupComponent);
    modal.componentInstance.commodityCode = Password;

    modal.result.then(
      data => {
        this.spinner.show();
        const sub = this.userProfileService
          .changePassword(data)
          .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                if (res.code === 201 || res.code === 200) {
                this.toastr.popSucces('Password changed.');
                // this.data.push(res.result);
                this.logout();
                }
                sub.unsubscribe();
              },
              err => {
                this.toastr.popError('Problem while changing password.');
                sub.unsubscribe();
              }
            );
        },
        cancel => { }
    );
  }

  save(type: string): void {
    this.spinner.show();
    switch (type) {
      case 'userProfile':
        const sub = this.userProfileService.saveUserProfile(this.profileForm.getRawValue(), this.user.userId)
        .finally(() => this.spinner.hide())
        .subscribe(
            res => {
              this.toastr.popSucces(' User profile saved.');
              this.data.push(res.res);
            },
            err => {
              this.toastr.popError('Problem saving user profile.');
              logError(err.error);
              sub.unsubscribe();
              // show error toaster
            }
          );
        break;
    }
  }

  logout() {
    localStorage.removeItem('p2s_access_token');
    this.userDetailService.setUser(null);
    window.location.reload();
    this.router.navigate(['login']);

  }
}

