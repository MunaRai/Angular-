import { Component, OnInit, Input } from '@angular/core';
import { Tracker } from '@shared/system-models/tracker.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Distributor } from '@shared/system-models/distributor.model';
import { TrackerService } from '../../../tracker/service/tracker.service';

@Component({
  selector: 'p2s-tracker-assign',
  templateUrl: './tracker-assign.component.html',
  styleUrls: ['./tracker-assign.component.scss']
})
export class TrackerAssignComponent implements OnInit {

  distributor: Distributor ;

  formSubmitted= false;
  
  trackers: Tracker[]=[];
  
  tempTrackerIds = [];

  distributorForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    private modal: NgbActiveModal,
    private trackerService: TrackerService
  ) { }

  ngOnInit() {
    this.fetchTrackers();
    this.buildForm();
  }

  buildForm(){
    this.distributorForm = this.fb.group({
    // trackerId: this.fb.array([]),
  });
  }


  fetchTrackers(){
    this.trackerService.getAllUnassignedTrackers()
      .subscribe(
        data => {
          this.trackers = data.result;
        }

      )
  }


  save(){
    this.formSubmitted = true;
    if(this.distributorForm.valid){
      const distributorData = this.distributorForm.getRawValue(); 
      this.modal.close(Object.assign({},this.distributor,distributorData));
    }
  }

  dismiss(){
    this.modal.dismiss();
  }



}
