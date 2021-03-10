import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
import { OrderManagementService } from '../../services/order-management.service';
import { CommodityCode } from '@shared/models/commodity-code.model';
import { ClientMaster } from '@shared/models/client-master.model';
import { Order, Freight } from '@shared/models/order.model';
import { ClientMasterServiceService } from '../../../client-master/pages/client-master-service.service';
import { CommodityCodeServiceService } from '../../../commodity-code/pages/commodity-code-service.service';


export interface SearchStatus {
  shipper: string;
  consigny: string;
  commodity: string;
}

@Component({
  selector: 'p2s-order-management-form-popup',
  templateUrl: './order-management-form-popup.component.html',
  styleUrls: ['./order-management-form-popup.component.scss']
})
export class OrderManagementFormPopupComponent implements OnInit {

  order: Order = new Order();

  freight: Freight = new Freight();

  mode = 'add';

  orderForm: FormGroup;

  freightForm: FormGroup;

  commodityCodeForm: FormGroup;

  clientMaster: ClientMaster = new ClientMaster();

  commodityCode: CommodityCode = new CommodityCode();

  formSubmitted = false;

  searchStatus: SearchStatus = {
    shipper: 'inactive',
    consigny: 'inactive',
    commodity: 'inactive',
  };

  hideShipperSearchingWhenUnsubscribed = new Observable(() => () => this.searchStatus.shipper = 'inactive');

  selectedShipper: ClientMaster;

  selectedConsigny: ClientMaster;

  selectedCommodity: CommodityCode;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private clientMasterService: ClientMasterServiceService,
    private service: OrderManagementService,
    private commodityService: CommodityCodeServiceService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {

    this.freightForm = this.fb.group({
      orderMngFrieghtPieces: [this.freight.orderMngFrieghtPieces],
      orderMngFrieghtWeight: [this.freight.orderMngFrieghtWeight],
      orderMngFrieghtHeight: [this.freight.orderMngFrieghtHeight],
      orderMngFrieghtlenght: [this.freight.orderMngFrieghtlenght],
      orderMngFrieghtWidth: [this.freight.orderMngFrieghtWidth],
      orderMngFrieghtRate: [this.freight.orderMngFrieghtRate],
      orderMngFrieghtCube: [this.freight.orderMngFrieghtCube],
      orderMngFrieghtDeliveryDate: [this.freight.orderMngFrieghtDeliveryDate],
      orderMngFrieghtPickupDate: [this.freight.orderMngFrieghtPickupDate]
    });
    this.orderForm = this.fb.group({
      orderManagementShipperId: [this.order.orderManagementShipperId, Validators.required],
      orderManagementConsignyId: [this.order.orderManagementConsignyId, [Validators.required]],
      orderManagementBillStatus: [this.order.orderManagementBillStatus, [Validators.required]],
      orderManagementCommodityId: [this.order.orderManagementCommodityId],
      orderMngFrieghtDetails: this.freightForm
      // datePickup: [this.order.datePickup, [Validators.required]],
      // dateDelivery: [this.order.dateDelivery, [Validators.required]],
     
    });
  }

  save() {
    this.formSubmitted = true;
    if (this.orderForm.valid) {
      const orderData = this.orderForm.getRawValue();
      orderData.orderManagementShipperId = (orderData.orderManagementShipperId);
      orderData.orderManagementConsignyId = (orderData.orderManagementConsignyId);
      orderData.orderManagementBillStatus = (orderData.orderManagementBillStatus);
      // orderData.orderManagementCommodityId = this.orderForm.controls['orderManagementCommodityId'];
      orderData.orderManagementCommodityId = (orderData.orderManagementCommodityId);
      this.modal.close(Object.assign({}, this.order, orderData));
    }
  }

  cancel() {
    this.modal.dismiss();
  }

  selectClientMaster(type: string, data: ClientMaster) {
    if (type === 'shipper') {
      this.orderForm.controls['shipper'].patchValue(data);
    } else {
      this.orderForm.controls['consigny'].patchValue(data);
    }
  }

  cancelClientMasterSelection(type: string) {
    if (type === 'shipper') {
      this.orderForm.controls['shipper'].reset();
    } else {
      this.orderForm.controls['consigny'].reset();
    }
  }

  searchShipper = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searchStatus.shipper = 'searching'),
      switchMap(term =>
        this.clientMasterService.getClientFor(term).pipe(
          tap(() => this.searchStatus.shipper = 'failed'),
          catchError(() => {
            this.searchStatus.shipper = 'failed';
            return of([]);
          }))
      ),
      tap(() => this.searchStatus.shipper = 'inactive')
    );
  }

  searchConsigny = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searchStatus.consigny = 'searching'),
      switchMap(term =>
        this.clientMasterService.getClientFor(term).pipe(
          tap(() => this.searchStatus.consigny = 'failed'),
          catchError(() => {
            this.searchStatus.consigny = 'failed';
            return of([]);
          }))
      ),
      tap(() => this.searchStatus.consigny = 'inactive')
    );
  }

  searchCommodity = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searchStatus.commodity = 'searching'),
      switchMap(term =>
        this.commodityService.getCommodityFor(term).pipe(
          tap(() => this.searchStatus.commodity = 'failed'),
          catchError(() => {
            this.searchStatus.commodity = 'failed';
            return of([]);
          }))
      ),
      tap(() => this.searchStatus.commodity = 'inactive')
    );
  }


  clientMasterFormatter(item: ClientMaster) {
    return `ID: ${item.clientId}, Name: ${ item.clientMasterFirstName } ${item.clientMasterLastName}, Address: ${ item.clientMasterAddress.country} ${ item.clientMasterAddress.city} , Phone: ${item.clientMasterPhone}`;
  }

  commodityCodeFormatter(item: CommodityCode) {
    return ` Name: ${ item.commodityCode }, Description: ${item.commodityCodeDescription}, ID: ${item.commodityCodeId}`;
  }

  onCommodityCodeSelect(cc: CommodityCode) {
    this.orderForm.controls['orderManagementCommodityId'].patchValue(cc.commodityCodeId);
    this.selectedCommodity = cc;
  }

  onShipperSelect(cm: ClientMaster) {
    this.orderForm.controls['orderManagementShipperId'].patchValue(cm.clientMasterId);
    this.selectedShipper = cm;
  }

  onConsignySelect(cm: ClientMaster) {
    this.orderForm.controls['orderManagementConsignyId'].patchValue(cm.clientMasterId);
  }

  // clientMasterFirstName = (value: ClientMaster) => value.clientMasterFirstName || '';

  // clientMasterId = (value: ClientMaster) => value.clientMasterId || '';

  get orderMngFrieghtPickupDate() {
    return this.freightForm.controls.orderMngFrieghtPickupDate;
  }

  get orderMngFrieghtDeliveryDate() {
    return this.freightForm.controls.orderMngFrieghtDeliveryDate;
  }
  

  get orderManagementShipperId() {
    return this.orderForm.controls.orderManagementShipperId;
  }

  get orderManagementConsignyId() {
    return this.orderForm.controls.orderManagementConsignyId;
  }

  get orderManagementCommodityId() {
    return this.orderForm.controls.orderManagementCommodityId;
  }

  get orderManagementBillStatus() {
    return this.orderForm.controls.orderManagementBillStatus;
  }

}