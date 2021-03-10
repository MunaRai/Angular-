import { Component, OnInit, Input } from '@angular/core';
import { Tracker } from '@shared/system-models/tracker.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Model } from '@shared/system-models/model.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { ModelService } from '../../../model/service/model.service';
import { CheckPattern } from '@shared/models/check-pattern.model';

@Component({
  selector: 'p2s-tracker-form',
  templateUrl: './tracker-form.component.html',
  styleUrls: ['./tracker-form.component.scss']
})
export class TrackerFormComponent implements OnInit {

  
  @Input()
  tracker: Tracker = new Tracker();

  pagingSorting: PaginationResult = new PaginationResult();

  mode= 'add';

  models: Model[]=[];

  trackerForm: FormGroup;
  
  formSubmitted = false;

  checkPattern : CheckPattern = new CheckPattern();


  constructor(
    private fb:FormBuilder,
    private modal: NgbActiveModal,
    private modelService: ModelService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.fetchModelNames();
  }

  buildForm(){
    this.trackerForm = this.fb.group({
      trackerId: this.tracker.trackerId,
      trackerModelNumberId : [this.tracker.trackerModelNumberId, [Validators.required]],
      // trackerName: this.tracker.trackerName,
      trackerImeiNumber: [this.tracker.trackerImeiNumber, [Validators.required, Validators.minLength(7), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
      trackerSimNumber: [this.tracker.trackerSimNumber,[Validators.pattern(this.checkPattern.errorPattern)]],
      
    });
  }


  //fetch every model names of the devices
  fetchModelNames() {
    this.modelService.getAllModelNames()
      .subscribe(
        ({result}) => {
          this.models = result;
        },
        error => {
          console.error('Error while fetching model names', error);
        }
      );
  }


  close() {
    this.modal.close();
  }

  dismiss() {
    this.modal.dismiss();
  }

  save(){
    this.formSubmitted = true;
    if (this.trackerForm.valid) {
      const trackerData = this.trackerForm.getRawValue();
      trackerData.trackerModelNumberId = (trackerData.trackerModelNumberId);
      // trackerData.trackerName = (trackerData.trackerName);
      trackerData.trackerImeiNumber = ('0'+trackerData.trackerImeiNumber);
      trackerData.trackerSimNumber = (trackerData.trackerSimNumber);
      
      this.modal.close(Object.assign({}, this.tracker, trackerData));
    }
  }
  
  get trackerModelNumberId() {
    return this.trackerForm.controls.trackerModelNumberId;
  }

  get trackerImeiNumber() {
    return this.trackerForm.controls.trackerImeiNumber;
  }

  get trackerSimNumber() {
    return this.trackerForm.controls.trackerSimNumber;
  }
  

}
