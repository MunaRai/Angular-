import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelService } from 'app/modules/system/pages/model/service/model.service';
import { Model } from '@shared/system-models/model.model';
import { UserService } from '../../services/user.service';
import { Distributor } from '@shared/system-models/distributor.model';
import { User } from '@shared/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TrackerService } from 'app/modules/tracker-management/services/tracker.service';
import { Tracker } from '@shared/models/tracker.model';

@Component({
  selector: 'p2s-assign-tracker-distributor',
  templateUrl: './assign-tracker-distributor.component.html',
  styleUrls: ['./assign-tracker-distributor.component.scss']
})
export class AssignTrackerDistributorComponent implements OnInit {

  user: User;

  loggedInUser: User;

  models: Model[];

  distributor: Distributor = new Distributor();

  trackers: Tracker[] = [];

  distributorForm: FormGroup;

  formSubmitted = false;

  trackerIds = [];

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private modelService: ModelService,
    private userService: UserService,
    private jwtHelperService: JwtHelperService,
    private trackerService: TrackerService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.fetchModelNames();
    this.fetchDistributorDetailsByUserId();
  }

  buildForm() {
    this.distributorForm = this.fb.group({
      username: this.user.username,
      modelId: '',
      trackerId: this.distributor.trackerId,
      licenseId: '',
    }
    );
  }

  save() {
    this.formSubmitted = true;
    if (this.distributorForm.valid) {
      const distributorData = this.distributorForm.getRawValue();
      distributorData.trackerId = this.trackerIds;
      this.modal.close(Object.assign({}, this.distributor, distributorData));
    }
  }

  cancle() {
    this.modal.dismiss();
  }

  dismiss() {
    this.modal.dismiss();
  }

  // fetch every model names of the devices
  fetchModelNames() {
    this.modelService.getAllModelNames()
      .subscribe(
        ({ result }) => {
          this.models = result;
        },
        error => {
          console.error('Error while fetching model names', error);
        }
      );
  }

  getTrackers() {
    const modelId = this.distributorForm.getRawValue().modelId;

    this.trackerService.getTrackerByModelId(modelId)
      .subscribe(
        data => {
          this.trackers = data.result;
        },
        error => {
          console.error('error fetching trackers', error);
        }

      );
  }

  get username() {
    return this.distributorForm.controls.username;
  }

  fetchDistributorDetailsByUserId() {
    const userId = this.jwtHelperService.decodeToken().id;
    this.userService.getDistributorByUserId(userId)
      .subscribe(
        data => {
          this.distributor = data.result;
        },
        error => {
          console.error('Error is ', error);
        }
      );
  }

  trackerChange(trackerId) {
    if (this.trackerIds.includes(trackerId)) {
      const idx = this.trackerIds.indexOf(trackerId);
      this.trackerIds.splice(idx, 1);
    } else {
      this.trackerIds.push(trackerId);
    }
  }
}
