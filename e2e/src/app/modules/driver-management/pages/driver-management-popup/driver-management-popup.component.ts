import { Component, OnInit, Input } from '@angular/core';
import { Driver } from '@shared/models/driver.model';
import { FormGroup, FormBuilder, Validators } from '../../../../../../node_modules/@angular/forms';
import { User } from '@shared/models/user.model';
import { Address } from '@shared/models/address.model';
import { NgbActiveModal } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'p2s-driver-management-popup',
  templateUrl: './driver-management-popup.component.html',
  styleUrls: ['./driver-management-popup.component.scss']
})
export class DriverManagementPopupComponent implements OnInit {

  mode = 'add';

  driver: Driver = new Driver();

  user: User = new User();

  address: Address = new Address();

  driverForm: FormGroup;
  userForm: FormGroup;
  addressForm: FormGroup;

  formSubmitted = false;

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) {}

  ngOnInit(){
    this.buildForm();
  }

  buildForm() {
    if (this.mode === 'add') {
    this.addressForm = this.fb.group({
      street1: this.address.street1,
      street2: this.address.street2,
      city: [this.address.city, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      state: this.address.state,
      country: [this.address.country, [Validators.required]],
      zipCode: this.address.zipCode
    });
    
    this.userForm = this.fb.group({
      userFirstName:[ this.user.userFirstName,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      userMiddleName: this.user.userMiddleName,
      userLastName: [this.user.userLastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      userEmail: [this.user.userEmail, [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      userPhone:[this.user.userPhone, [Validators.required, Validators.minLength(7), Validators.maxLength(40)]],
      username:[this.user.username,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      userGender:'MALE',
      userPassword:[this.user.userPassword,[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      userAddress: this.addressForm,
    });

    this.driverForm = this.fb.group({
      orderMngDriverId: [this.driver.orderMngDriverId],
      orderMngDriverTagId: [this.driver.orderMngDriverTagId, Validators.required],
      orderMngDriverLicenseId: [this.driver.orderMngDriverLicenseId, Validators.required],
      orderMngDriverLicenseValid: [this.driver.orderMngDriverLicenseValid,Validators.required],
      orderMngDriverDateOfJoining: [this.driver.orderMngDriverDateOfJoining, Validators.required],
      orderMngUserDto: this.userForm

    });
  }else {
    this.addressForm = this.fb.group({
      street1: this.address.street1,
      street2: this.address.street2,
      city: [this.address.city, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      state: this.address.state,
      country: [this.address.country, [Validators.required]],
      zipCode: this.address.zipCode
    });
    
    this.userForm = this.fb.group({
      userFirstName:[ this.user.userFirstName,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      userMiddleName: this.user.userMiddleName,
      userLastName: [this.user.userLastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      userEmail: [this.user.userEmail, [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      userPhone:[this.user.userPhone, [Validators.required, Validators.minLength(7), Validators.maxLength(40)]],
      username:[this.user.username,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      userGender:'MALE',
      userAddress: this.addressForm,
    });

    this.driverForm = this.fb.group({
      orderMngDriverId: [this.driver.orderMngDriverId],
      orderMngDriverTagId: [this.driver.orderMngDriverTagId, Validators.required],
      orderMngDriverLicenseId: [this.driver.orderMngDriverLicenseId, Validators.required],
      orderMngDriverLicenseValid: [this.driver.orderMngDriverLicenseValid,Validators.required],
      orderMngDriverDateOfJoining: [this.driver.orderMngDriverDateOfJoining, Validators.required],
      orderMngUserDto: this.userForm

    });
  }
  }

  save(){
    this.formSubmitted = true;
    if(this.driverForm.valid) {
      const driverData = this.driverForm.getRawValue();
      // this.modal.close(this.driverForm.getRawValue());
      this.modal.close(Object.assign({}, this.driver, driverData));
    }
  }
  
  cancel() {
    this.modal.dismiss();
  }
  get userFirstName() {
    return this.userForm.controls.userFirstName;
  }

  get userLastName() {
    return this.userForm.controls.userLastName;
  }

  get userAccountType() {
    return this.userForm.controls.userAccountType;
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

  get orderMngDriverTagId() {
    return this.driverForm.controls.orderMngDriverTagId;
  }
  get orderMngDriverLicenseId() {
    return this.driverForm.controls.orderMngDriverLicenseId;
  }
  get orderMngDriverLicenseValid() {
    return this.driverForm.controls.orderMngDriverLicenseValid;
  }
  get orderMngDriverDateOfJoining() {
    return this.driverForm.controls.orderMngDriverDateOfJoining;
  }



}
