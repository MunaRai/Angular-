import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrdersPopupComponent } from '../orders-popup/orders-popup.component';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { OrderManagementService } from 'app/modules/order-management/services/order-management.service';
import { ToastService } from '@shared/services/toast.service';
import { Order } from '@shared/models/order.model';
import { PaginationResult } from '@shared/models/pagination-result.model';

const MOCK: any[] = [
  {
    orderID: '123123',
    shipper: {
      name: 'Prajwal Simkhada',
      addressLine1: 'Machhindra Bahal - 19',
      addressLine2: 'Ptan Marg',
      city: 'Lalitpur',
      country: 'Nepal',
      countryCode: 'NP-123',
      zip: '44700',
      pickup: new Date()
    },
    consigny: {
      name: 'Sanjay Hona',
      addressLine1: 'Baluwatar - 56',
      addressLine2: 'Upahar Marg',
      city: 'Kathmandu',
      country: 'Nepal',
      countryCode: 'NP-123',
      zip: '44600',
      delivery: new Date()
    },
    status: 'available',
    freight: {
      weight: {
        value: '103',
        unit: 'KG'
      },
      pieces: 30
    },
    createdOn: new Date()
  },

 
];

@Component({
  selector: 'p2s-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  // available: any[] = MOCK;

  // inTransit: any[] = MOCK;

  // delivered: any[] = MOCK;

  // cancelled: any[] = MOCK;

  orders: Order[] =[];

  period = 'today';

  isPanelOpen = true;
  pagingSorting : PaginationResult = new PaginationResult();

  constructor(
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private orderService: OrderManagementService,
    private toaster: ToastService
  ) { }

  ngOnInit() {
  }

  fetchOrderSummary() {
    // this.available = +(Math.random() * (1000 - 100) + 100).toFixed();
    // this.inTransit = +(Math.random() * (1000 - 100) + 100).toFixed();
    // this.delivered = +(Math.random() * (1000 - 100) + 100).toFixed();
    // this.cancelled = +(Math.random() * (1000 - 100) + 100).toFixed();
  }

  openOrderPopup(type: string): void {
    let data;
    switch (type.toLowerCase()) {
      case 'available':
        // data = this.available;
        break;
      case 'in transit':
        // data = this.inTransit;
        break;
      case 'delivered':
        // data = this.delivered;
        break;
      case 'cancelled':
        // data = this.cancelled;
        break;
    }
    const modal: NgbModalRef = this.modal.open(OrdersPopupComponent, { windowClass: 'order-popup' });

    modal.componentInstance.orderType = type;
    modal.componentInstance.orders = data;
    
  }

  // {
  //   orderID: '124532',
  //   shipper: {
  //     name: 'Shankar Regmi',
  //     addressLine1: 'Malepatan - 13',
  //     addressLine2: 'Jhor',
  //     city: 'Pokhara',
  //     country: 'Nepal',
  //     countryCode: 'NP-123',
  //     zip: '43700',
  //     pickup: new Date()
  //   },
  //   consigny: {
  //     name: 'Sanjay Hona',
  //     addressLine1: 'Baluwatar - 56',
  //     addressLine2: 'Upahar Marg',
  //     city: 'Kathmandu',
  //     country: 'Nepal',
  //     countryCode: 'NP-123',
  //     zip: '44600',
  //     delivery: new Date()
  //   },
  //   status: 'delivered',
  //   freight: {
  //     weight: {
  //       value: '312',
  //       unit: 'KG'
  //     },
  //     pieces: 44
  //   },
  //   createdOn: new Date()
  // },

  // {
  //   orderID: '245154',
  //   shipper: {
  //     name: 'Shankar Regmi',
  //     addressLine1: 'Malepatan - 13',
  //     addressLine2: 'Jhor',
  //     city: 'Pokhara',
  //     country: 'Nepal',
  //     countryCode: 'NP-123',
  //     zip: '43700',
  //     pickup: new Date()
  //   },
  //   consigny: {
  //     name: 'Sanjay Hona',
  //     addressLine1: 'Baluwatar - 56',
  //     addressLine2: 'Upahar Marg',
  //     city: 'Kathmandu',
  //     country: 'Nepal',
  //     countryCode: 'NP-123',
  //     zip: '44600',
  //     delivery: new Date()
  //   },
  //   status: 'inTransit',
  //   freight: {
  //     weight: {
  //       value: '103',
  //       unit: 'KG'
  //     },
  //     pieces: 30
  //   },
  //   createdOn: new Date()
  // },

  // {
  //   orderID: '1125632',
  //   shipper: {
  //     name: 'Shankar Regmi',
  //     addressLine1: 'Malepatan - 13',
  //     addressLine2: 'Jhor',
  //     city: 'Pokhara',
  //     country: 'Nepal',
  //     countryCode: 'NP-123',
  //     zip: '43700',
  //     pickup: new Date()
  //   },
  //   consigny: {
  //     name: 'Sanjay Hona',
  //     addressLine1: 'Baluwatar - 56',
  //     addressLine2: 'Upahar Marg',
  //     city: 'Kathmandu',
  //     country: 'Nepal',
  //     countryCode: 'NP-123',
  //     zip: '44600',
  //     delivery: new Date()
  //   },
  //   status: 'cancelled',
  //   freight: {
  //     weight: {
  //       value: '103',
  //       unit: 'LBS'
  //     },
  //     pieces: 30
  //   },
  //   createdOn: new Date()
  // }

}
