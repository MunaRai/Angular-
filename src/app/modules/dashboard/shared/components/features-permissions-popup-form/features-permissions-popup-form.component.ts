import { Component, OnInit } from '@angular/core';
import { Feature } from '@shared/models/feature.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Permission } from '@shared/models/permission.model';

@Component({
  selector: 'p2s-features-permissions-popup-form',
  templateUrl: './features-permissions-popup-form.component.html',
  styleUrls: ['./features-permissions-popup-form.component.scss']
})
export class FeaturesPermissionsPopupFormComponent implements OnInit {

  mode = 'feature';

  data: Feature | Permission | any;

  dataForm: FormGroup;

  formSubmitted = false;

  types: string[] = [];

  saveType = 'add';

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    if (this.mode === 'feature' && this.saveType === 'add') {
      this.data = new Feature();
    } else if (this.saveType === 'add') {
      this.data = new Permission();
    }
    this.buildForm();
  }

  buildForm() {
    if (this.mode === 'feature') {
      this.dataForm = this.fb.group({
        name: [this.data.featureName, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        type: [this.data.featureType, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
      });
    } else {
      this.dataForm = this.fb.group({
        name: [this.data.permissionName, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        type: [this.data.permissionType, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
      });
    }
  }

  get name() {
    return this.dataForm.controls.name;
  }


  cancel() {
    this.modal.dismiss();
  }

  save() {
    this.formSubmitted = true;
    if (this.dataForm.valid) {
      let data = {};
      if (this.mode === 'feature') {
        data = {
          featureName: this.dataForm.get('name').value,
          featureType: this.dataForm.get('type').value,
        };
      } else {
        data = {
          permissionName: this.dataForm.get('name').value,
          permissionType: this.dataForm.get('type').value,
        };
      }
      this.modal.close(data);
    }
  }

}
