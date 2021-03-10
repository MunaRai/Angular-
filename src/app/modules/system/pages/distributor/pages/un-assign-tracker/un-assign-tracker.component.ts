import { Component, OnInit } from '@angular/core';
import { Distributor } from '@shared/system-models/distributor.model';
import { Tracker } from '@shared/system-models/tracker.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TrackerService } from '../../../tracker/service/tracker.service';

@Component({
  selector: 'p2s-un-assign-tracker',
  templateUrl: './un-assign-tracker.component.html',
  styleUrls: ['./un-assign-tracker.component.scss']
})
export class UnAssignTrackerComponent implements OnInit {

  distributor: Distributor;

  formSubmitted = false;

  trackers: Tracker[];

  distributorForm: FormGroup;

  tempTrackerIds = [];

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private trackerService: TrackerService
  ) { }

  ngOnInit() {
    this.fetchTrackers();
    this.buildForm();
  }

  buildForm() {
    this.distributorForm = this.fb.group({
    });
  }

  fetchTrackers() {
    const tempTrackerList = [];
    this.trackerService.getAllTrackers()
      .subscribe(
        data => {
          console.log('the list of tracker is ' , data.result);
          
          this.distributor.trackerId.forEach(trackerId => {
            const tracker = data.result.find(tr => tr.trackerId === trackerId);
            if(tracker){

              tempTrackerList.push(tracker);
            }
          });
          this.trackers = tempTrackerList;
        }
      );
  }

  save() {
    this.formSubmitted = true;
    if (this.distributorForm.valid) {
      const distributorData = this.distributorForm.getRawValue();
      this.modal.close({...this.distributor, ...distributorData});
    }
  }

  dismiss() {
    this.modal.dismiss();
  }
}
