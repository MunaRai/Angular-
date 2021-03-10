import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Helper, convertDateFormat } from '@shared/helpers/helper';
import { addYears } from 'date-fns';
import { Feature } from '@shared/models/feature.model';
import { Tracker } from '@shared/models/tracker.model';
import { UserDetailService } from '@shared/services/user-detail.service';
import { TrackerService } from '../../services/tracker.service';
import { Observable } from 'rxjs/Observable';
import {catchError, debounceTime, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { User } from '@shared/models/user.model';
import { CheckPattern } from '@shared/models/check-pattern.model';

@Component({
  selector: 'p2s-tracker-form-popup',
  templateUrl: './tracker-form-popup.component.html',
  styleUrls: ['./tracker-form-popup.component.scss']
})
export class TrackerFormPopupComponent implements OnInit {

  mode = 'add';

  tracker: Tracker = new Tracker();

  trackerForm: FormGroup;

  featureForm: FormGroup;

  features: Feature[] = null;

  trackerModels: string[] = ['PS-201', 'PS-202', 'PS-204'];

  today: any = new Date();

  formSubmitted = false;

  searching = false;
  
  searchFailed = false;

  user: User;

  checkPattern : CheckPattern = new CheckPattern();

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private userDetailService: UserDetailService,
    private trackerService: TrackerService
  ) { }

  ngOnInit() {
    this.buildForm();
    // const userRole = this.userDetailService.user.userRole;
    // if(userRole === 'ROLE_ADMIN') {
    //   this.trackerForm.addControl('trackerCreatedFor', new FormControl('', Validators.required));
    // }
  }

  buildForm() {

    this.featureForm = this.fb.group({
      id: '',
      name: '',
      isEnabled: false
    });

    this.trackerForm = this.fb.group({
      trackerId: this.tracker.trackerId,
      trackerCode: this.tracker.trackerCode,
      trackerName: [this.tracker.trackerName, [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern(this.checkPattern.errorPattern)]],
      trackerImeiNumber: [this.tracker.trackerImeiNumber, [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      trackerModelName: [this.tracker.trackerModelName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      trackerStatus: this.tracker.trackerStatus,
      trackerDateInstalled: [this.tracker.trackerDateInstalled],
      trackerDateExpiry: [this.tracker.trackerDateExpiry],
      trackerIcon: [this.tracker.trackerIcon,[Validators.required]],
      // trackerCreatedFor: [this.tracker.trackerCreatedFor, [Validators.required]],
      trackerSimProvider: [this.tracker.trackerSimProvider,[Validators.pattern(this.checkPattern.errorPattern)]],
      trackerSimNumber: [this.tracker.trackerSimNumber, [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern(this.checkPattern.errorPattern)]],
      trackerFeatures: this.fb.array([]),
      trackerSimValidDate: [this.tracker.trackerSimValidDate],
      trackerDatePurchased: [this.tracker.trackerDatePurchase],
      trackerSpeedLimit: [this.tracker.trackerSpeedLimit],
      trackerIsFavorite: this.tracker.trackerIsFavorite,
      vipTracker: this.tracker.vipTracker
    });
  }

  save() {
    this.formSubmitted = true;
    if (this.trackerForm.valid) {
      const trackerData = this.trackerForm.getRawValue();
      // trackerData.trackerDatePurchase = ((trackerData.trackerDatePurchased));
      // trackerData.trackerDateExpiry = ((trackerData.trackerDateExpiry));
      // trackerData.trackerDateInstalled =( (trackerData.trackerDateInstalled));
      trackerData.trackerDateSimValid = ((trackerData.trackerDateSimValid));
      this.modal.close(Object.assign({}, this.tracker, trackerData));
    }
  }

  close() {
    this.modal.close();
  }

  dismiss() {
    this.modal.dismiss();
  }

  get trackerName() {
    return this.trackerForm.controls.trackerName;
  }

  get trackerImeiNumber() {
    return this.trackerForm.controls.trackerImeiNumber;
  }

  get trackerModelName() {
    return this.trackerForm.controls.trackerModelName;
  }

  get trackerSimNumber() {
    return this.trackerForm.controls.trackerSimNumber;
  }

  get trackerIcon() {
    return this.trackerForm.controls.trackerIcon;
  }
  get trackerCreatedFor() {
    return this.trackerForm.controls.trackerCreatedFor;
  }

  get trackerSimProvider() {
    return this.trackerForm.controls.trackerSimProvider;
  }

  get trackerSimValidDate() {
     return this.trackerForm.controls.trackerSimValidDate;
  }

  get vipTracker(){
  return this.trackerForm.controls.vipTracker;
}


  hasFeature(id) {
    return this.tracker.trackerFeatures && this.tracker.trackerFeatures.includes(id);
  }

  featureChange(id) {
    if (this.tracker.trackerFeatures.includes(id)) {
      const idx = this.tracker.trackerFeatures.indexOf(id);
      this.tracker.trackerFeatures.splice(idx, 1);
    } else {
      this.tracker.trackerFeatures.push(id);
    }
  }

  fetchCreatedFor = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.trackerService.getUserFor(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );
  }
 
}
