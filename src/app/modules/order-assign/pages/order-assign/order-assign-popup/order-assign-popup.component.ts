import { Component, OnInit } from '@angular/core';
import { OrderAssign } from '@shared/models/order-assign.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { Tracker } from '@shared/models/tracker.model';
import { NgbActiveModal } from '../../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { TrackerService } from '../../../../tracker-management/services/tracker.service';
import { WizardHeaderItem } from '@shared/components/wizard/wizard-types';
import { Order } from '@shared/models/order.model';
import { OrderManagementService } from '../../../../order-management/services/order-management.service';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { DriverManagementServiceService } from '../../../../driver-management/service/driver-management-service.service';
import { Driver } from '@shared/models/driver.model';


export interface SearchStatus {
    tracker: string;
    driver: string;
}

@Component({
  selector: 'p2s-order-assign-popup',
  templateUrl: './order-assign-popup.component.html',
  styleUrls: ['./order-assign-popup.component.scss']
})
export class OrderAssignPopupComponent implements OnInit {

  orderAssign: OrderAssign = new OrderAssign();

  mode = 'add';

  orderAssignForm: FormGroup

  searchStatus: SearchStatus = {
    tracker: 'inactive',
    driver: 'inactive',
  }

  formSubmitted = false;

  selectedTracker: Tracker;

  selectedDriver: Driver;

  orders: Order[] = [];

  
  pagingSorting: PaginationResult = new PaginationResult();


  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private orderManagementService: OrderManagementService,
    private trackerService: TrackerService,
    private driverService: DriverManagementServiceService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderManagementService.getAvailableOrder(this.pagingSorting)
      .subscribe(
        ({ paginationResult, result, meta }) => {
          this.orders = result;
          // this.pagingSorting.totalPages =  paginationResult.totalPages;
        },
        error => {
        }
      );
}


  buildForm(){
    this.orderAssignForm = this.fb.group({
      orderAssigntrackerId: [this.orderAssign.orderAssigntrackerId],
      orderAssignOrderManagementIds: [this.orderAssign.orderAssignOrderManagementIds],
      orderAssignDateLong: [this.orderAssign.orderAssignDateLong],
      orderAssignStatus: [this.orderAssign.orderAssignStatus],
      orderAssignDescription: [this.orderAssign.orderAssignDescription],
      orderAssignDriverId: [this.orderAssign.orderAssignDriverId]
    })
  }
  save() {
    this.formSubmitted = true;
    if (this.orderAssignForm.valid) {
      // this.modal.close(Object.assign({}, this.clientMaster, this.clientMasterForm.getRawValue()));
      // const orderAssignData = this.orderAssignForm.getRawValue;
      // this.modal.close(Object.assign({},this.orderAssign, orderAssignData);
      this.modal.close(this.orderAssignForm.getRawValue());
    }
  }


  searchTracker = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searchStatus.tracker = 'searching'),
      switchMap(term =>
        this.trackerService.getTrackerFor(term).pipe(
          tap(() => this.searchStatus.tracker = 'failed'),
          catchError(() => {
            this.searchStatus.tracker = 'failed';
            return of([]);
          }))
      ),
      tap(() => this.searchStatus.tracker = 'inactive')
    );
  }

  searchTrackerFormatter(item: Tracker) {
    return `Name: ${ item.trackerImeiNumber }, ID: ${item.trackerName} `;
  }

  onTrackerSelect(cc: Tracker) {
    this.orderAssignForm.controls['orderAssigntrackerId'].patchValue(cc.trackerId);
    this.selectedTracker = cc;
  }

  searchDriver = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searchStatus.driver = 'searching'),
      switchMap(term =>
        this.driverService.getDriverFor(term).pipe(
          tap(() => this.searchStatus.driver = 'failed'),
          catchError(() => {
            this.searchStatus.driver = 'failed';
            return of([]);
          }))
      ),
      tap(() => this.searchStatus.driver = 'inactive')
    );
  }


 searchDriverFormatter(item: Driver) {
    return `Name: ${ item.orderMngDriverTagId }, ID: ${item.orderMngUserDto.userFirstName} `;
  }

  onDriverSelect(cc: Driver) {
    this.orderAssignForm.controls['orderAssignDriverId'].patchValue(cc.orderMngDriverId);
    this.selectedDriver = cc;
  }

  cancel() {
    this.modal.dismiss();
  }
  wizardHeadings: WizardHeaderItem[] = [
    {
      heading: ' Tracker Details',
      icon: 'fas fa-info',
      subHeading: ''
    },
    {
      heading: 'Select orders',
      icon: 'fa-address-card',
      subHeading: ''
    },
    {
      heading: 'Summary',
      icon: 'fa-key',
      subHeading: ''
    },
  ];

  onPrev(event) {
  }

  onNext(event) {
  }

  onComplete(event) {
    this.save();
  }
  

}
