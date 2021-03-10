import { Component, OnInit } from '@angular/core';
import { Tracker } from '@shared/models/tracker.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OdometerHistoryService } from '../odometer-history.service';
import { OdometerHistory } from '@shared/models/odometer-history.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'p2s-odometer-popup',
  templateUrl: './odometer-popup.component.html',
  styleUrls: ['./odometer-popup.component.scss']
})
export class OdometerPopupComponent implements OnInit {

  tracker: Tracker;

  trackerForm: FormGroup;

  odometerHistoryList: OdometerHistory[] = [];

  formSubmitted = false;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastService,
    private odometerHistoryService: OdometerHistoryService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.fetchOdometerHistoryOfTracker(this.tracker.trackerId);
  }

  buildForm() {
    this.trackerForm = this.fb.group({
      // trackerId: '',
      trackerOdometer: '',
    });
  }
  
  
  save() {
    const trackerData = this.trackerForm.getRawValue();
    const sub = this.odometerHistoryService.updateOdometerReading(trackerData, this.tracker.trackerId)
      .subscribe(
        data => {
          this.toastr.popSucces('Odometer Updated');
          this.modal.close();
          this.tracker.trackerOdometer = trackerData.trackerOdometer;
        },
        error => {
          this.toastr.popError('Error updating odometer');
          sub.unsubscribe();
        }
      )
  }

  dismiss() {
    this.modal.dismiss();
  }

  fetchOdometerHistoryOfTracker(trackerId) {
    this.odometerHistoryService.getOdometerHistoryOfTracker(trackerId)
      .subscribe(
        data => {
          this.odometerHistoryList = data.result;
        },
        error => {
          // console.error('Error while fething odometre histories' , error);
        }
      )
  }

  get trackerOdometer(){
    return this.trackerForm.controls.trackerOdometer;
  }

}


