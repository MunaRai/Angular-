import { Component, OnInit, Input } from '@angular/core';
import { License } from '@shared/system-models/license.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { LicenseService } from '../../services/license.service';
import { ToastService } from '@shared/services/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckPattern } from '@shared/models/check-pattern.model';

@Component({
  selector: 'p2s-license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.scss']
})
export class LicenseFormComponent implements OnInit {

  @Input()
  license: License = new License();

  heading='User Role';

  mode='add';

  licenseForm: FormGroup;
  
  formSubmitted = false;

  checkPattern : CheckPattern = new CheckPattern();
  
  constructor(
   private fb: FormBuilder,
   private modal: NgbActiveModal
    
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.licenseForm = this.fb.group({
      licenseName: [this.license.licenseName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
      licenseDescription: [this.license.licenseDescription, [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern(this.checkPattern.errorPattern)]],
      licenseType: [this.license.licenseType, [Validators.required]],
      licenseMonths: [this.license.licenseMonths, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
    });
  }

  close() {
    this.modal.close();
  }

  dismiss() {
    this.modal.dismiss();
  }


  save(){
    this.formSubmitted = true;
    if (this.licenseForm.valid) {
      const licenseData = this.licenseForm.getRawValue();
      licenseData.licenseName = (licenseData.licenseName);
      licenseData.licenseDescription = (licenseData.licenseDescription);
      licenseData.licenseType = (licenseData.licenseType);
      licenseData.licenseMonths = (licenseData.licenseMonths);
      this.modal.close(Object.assign({}, this.license, licenseData));
    }
  }

  get licenseName() {
    return this.licenseForm.controls.licenseName;
  }

  get licenseDescription() {
    return this.licenseForm.controls.licenseDescription;
  }

  get licenseType() {
    return this.licenseForm.controls.licenseType;
  }
  
  get licenseMonths() {
    return this.licenseForm.controls.licenseMonths;
  }

}
