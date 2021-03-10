import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Feature } from '@shared/system-models/feature.model';

@Component({
  selector: 'p2s-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss']
})
export class FeatureFormComponent implements OnInit {

  @Input()
  feature: Feature = new Feature();

  mode='add';

  featureForm: FormGroup;

  formSubmitted = false;
  
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.featureForm = this.fb.group({
      featureName: [this.feature.featureName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      featureType: [this.feature.featureType, [Validators.required]]
    })
  }

  close() {
    this.modal.close();
  }

  dismiss() {
    this.modal.dismiss();
  }

  save() {
    this.formSubmitted = true;
    if(this.featureForm.valid) {
      const featureData = this.featureForm.getRawValue();
      featureData.featureName = (featureData.featureName);
      featureData.featureType = (featureData.featureType);
      this.modal.close(Object.assign({}, this.feature, featureData));
    }
  }

  get featureName() {
    return this.featureForm.controls.featureName;
  }

  get featureType() {
    return this.featureForm.controls.featureType;
  }

}
