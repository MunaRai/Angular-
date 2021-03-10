import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { User } from '@shared/models/user.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Feature } from '@shared/models/feature.model';
import { Tracker } from '@shared/models/tracker.model';
import { CheckPattern } from '@shared/models/check-pattern.model';

@Component({
  selector: 'p2s-user-management-form-popup',
  templateUrl: './user-management-form-popup.component.html',
  styleUrls: ['./user-management-form-popup.component.scss']
})
export class UserManagementFormPopupComponent implements OnInit {

  mode = 'add';

  user: User = new User();

  userForm: FormGroup;

  addressForm: FormGroup;

  phonesForm: FormGroup;

  featureForm: FormGroup;

  features: Feature[] = null;

  trackers: Tracker[] = null;

  today: any = new Date();

  formSubmitted = false;

  showPassword = false;

  checkPattern : CheckPattern = new CheckPattern();

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.addressForm = this.fb.group({
      street1: [this.user.userAddress.street1,[Validators.pattern(this.checkPattern.errorPattern)]],
      street2: [this.user.userAddress.street2,[Validators.pattern(this.checkPattern.errorPattern)]],
      city: [this.user.userAddress.city, [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern(this.checkPattern.errorPattern)]],
      state: [this.user.userAddress.state,Validators.pattern(this.checkPattern.errorPattern)],
      country: [this.user.userAddress.country, [Validators.required]],
      zipCode: this.user.userAddress.zipCode
    });
    

    this.featureForm = this.fb.group({
      id: '',
      name: '',
      isEnabled: false
    });


    if (this.mode === 'add') {
      this.userForm = this.fb.group({
        userId: this.user.userId,
        userCode: this.user.userCode,
        userFirstName: [this.user.userFirstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        userMiddleName: [this.user.userMiddleName,[Validators.pattern(this.checkPattern.errorPattern)]],
        userLastName: [this.user.userLastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        userAccountType: [this.user.userAccountType],
        userGender: 'MALE',
        userAddress: this.addressForm,
        userOrganizationName: [this.user.userOrganizationName, [Validators.required, Validators.minLength(3), Validators.maxLength(40),Validators.pattern(this.checkPattern.errorPattern)]],
        userEmail: [this.user.userEmail, [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.pattern(this.checkPattern.emailPatternError)]],
        userPhone: [this.user.userPhone, [Validators.required, Validators.minLength(9), Validators.maxLength(20),Validators.pattern(this.checkPattern.errorPattern)]],
        username: [
          this.user.username,
          [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]
        ],
        userPassword: [this.user.userPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        userDateCreated: (this.user.userDateCreated),
        userDateExpires: (this.user.userDateExpires),
        userWebsite: this.user.userWebsite,
        userReseller: this.user.userReseller,
        // userFeatures: this.fb.array([]),
        // userTrackers: this.fb.array([]),
        userStatus: this.user.userStatus,
      });
    } else {
      this.userForm = this.fb.group({
        id: this.user.userId,
        userCode: this.user.userCode,
        userFirstName: [this.user.userFirstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern(this.checkPattern.errorPattern)]],
        userMiddleName: [this.user.userMiddleName,Validators.pattern(this.checkPattern.errorPattern)],
        userLastName: [this.user.userLastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern(this.checkPattern.errorPattern)]],
        userGender: [this.user.userGender],
        userAddress: this.addressForm,
        userOrganizationName: [this.user.userOrganizationName, [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(this.checkPattern.errorPattern)]],
        userAccountType: [this.user.userAccountType],
        userEmail: [this.user.userEmail, [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.pattern(this.checkPattern.emailPatternError)]],
        userPhone: [this.user.userPhone, [Validators.required, Validators.minLength(7), Validators.maxLength(40),Validators.pattern(this.checkPattern.errorPattern)]],
        username: [
          this.user.username,
          [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern(this.checkPattern.errorPattern)]
        ],
        userDateCreated: (this.user.userDateCreated),
        userDateExpires: (this.user.userDateExpires, true),
        userWebsite: this.user.userWebsite,
        userReseller: this.user.userReseller,
        userCreatedBy: this.user.userCreatedBy,
        // userFeatures: this.fb.array([]),
        // userTrackers: this.fb.array([]),
        userStatus: this.user.userStatus
      });
    }

  }

  initUserTrackers() {
    // return this.fb.array(this.user.userTrackers.map(tr => this.buildUserTracker(tr)));
  }

  get userFirstName() {
    return this.userForm.controls.userFirstName;
  }

  get userMiddleName() {
    return this.userForm.controls.userMiddleName;
  }
  
  get userLastName() {
    return this.userForm.controls.userLastName;
  }

  get userAccountType() {
    return this.userForm.controls.userAccountType;
  }

  get userOrganizationName() {
    return this.userForm.controls.userOrganizationName;
  }

  get userEmail() {
    return this.userForm.controls.userEmail;
  }

  get userPhone() {
    return this.userForm.controls.userPhone;
  }

  get username() {
    return this.userForm.controls.username;
  }

  get userPassword() {
    return this.userForm.controls.userPassword;
  }

  // get street1() {
  //   return this.addressForm.controls.street1;
  // }

  save() {
    this.formSubmitted = true;
    if (this.userForm.valid) {
      const userData = this.userForm.getRawValue();
      userData.userDateCreated = (userData.userDateCreated);
      userData.userDateExpires = (userData.userDateExpires);
      this.modal.close(Object.assign({}, this.user, userData));
    }
  }

  cancel() {
    this.modal.dismiss();
  }

  hasFeature(id) {
    return this.user.userFeatures && this.user.userFeatures.includes(id);
  }

  featureChange(id) {
    if (this.user.userFeatures.includes(id)) {
      const idx = this.user.userFeatures.indexOf(id);
      this.user.userFeatures.splice(idx, 1);
    } else {
      this.user.userFeatures.push(id);
    }
  }

  userFormatter(item: User){
    return 'ID : ${item.userId}, Name : ${item.userFirstName}';
  }

  onUserSelect(user: User){
    
  }
}
