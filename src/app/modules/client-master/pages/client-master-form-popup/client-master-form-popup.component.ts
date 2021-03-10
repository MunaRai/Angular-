import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientMaster } from '@shared/models/client-master.model';

@Component({
  selector: 'p2s-client-master-form-popup',
  templateUrl: './client-master-form-popup.component.html',
  styleUrls: ['./client-master-form-popup.component.scss']
})
export class ClientMasterFormPopupComponent implements OnInit {

  clientMaster: ClientMaster = new ClientMaster();

  clientMasterForm: FormGroup;

  addressForm: FormGroup;

  mode = 'add';

  formSubmitted = false;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.addressForm = this.fb.group({
      street1: this.clientMaster.clientMasterAddress.street1,
      street2: this.clientMaster.clientMasterAddress.street2,
      city: [this.clientMaster.clientMasterAddress.city, [Validators.required]],
      state: this.clientMaster.clientMasterAddress.state,
      country: [this.clientMaster.clientMasterAddress.country, [Validators.required]],
      zipCode: this.clientMaster.clientMasterAddress.zipCode
    });

    this.clientMasterForm = this.fb.group({
      clientMasterFirstName: [this.clientMaster.clientMasterFirstName, [Validators.required]],
      clientMasterMiddleName: [this.clientMaster.clientMasterMiddleName],
      clientMasterLastName: [this.clientMaster.clientMasterLastName, [Validators.required]],
      clientMasterPhone: [this.clientMaster.clientMasterPhone, [Validators.required]],
      clientMasterEmail: [this.clientMaster.clientMasterEmail, [Validators.required]],
      clientMasterAddress: this.addressForm,
      debtor: this.clientMaster.debtor,
      clientMasterAddressLat: [this.clientMaster.clientMasterAddressLat,[Validators.required]],
      clientMasterAddressLong: [this.clientMaster.clientMasterAddressLong, [Validators.required]]
    });
  }

  save() {
    this.formSubmitted = true;
    if (this.clientMasterForm.valid) {
      // this.modal.close(Object.assign({}, this.clientMaster, this.clientMasterForm.getRawValue()));
      this.modal.close(this.clientMasterForm.getRawValue());
    }
  }

  cancel() {
    this.modal.dismiss();
  }

}
