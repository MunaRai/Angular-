import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Model } from '@shared/system-models/model.model';
import {catchError, debounceTime, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { CheckPattern } from '@shared/models/check-pattern.model';
@Component({
  selector: 'p2s-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent implements OnInit {
  
  @Input()
  model: Model = new Model();

  mode= 'add';

  modelForm: FormGroup;
  
  formSubmitted = false;

  checkPattern : CheckPattern = new CheckPattern();


  constructor(
    private fb:FormBuilder,
    private modal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.modelForm = this.fb.group({
      modelId: this.model.modelId,  
      modelName: [this.model.modelName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
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
    if (this.modelForm.valid) {
      const modelData = this.modelForm.getRawValue();
      modelData.modelName = (modelData.modelName);
      modelData.modelDescription = (modelData.modelDescription);
      
      this.modal.close(Object.assign({}, this.model, modelData));
    }
  }


  get modelName() {
    return this.modelForm.controls.modelName;
  }

}
