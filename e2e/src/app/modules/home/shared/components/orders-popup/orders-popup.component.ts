import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Order } from '@shared/models/order.model';
import { OrderManagementService } from 'app/modules/order-management/services/order-management.service';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'p2s-orders-popup',
  templateUrl: './orders-popup.component.html',
  styleUrls: ['./orders-popup.component.scss'],
})
export class OrdersPopupComponent implements OnInit {
  orderType: string;

  orders: Order[] = [];

  email: string;
  type: string;

  emailStatus = 'pending';

  filter: string;

  allExpanded = false;
  pagingSorting: PaginationResult = new PaginationResult();

  themeMapping = {
    available: 'primary',
    'in transit': 'warning',
    delivered: 'success',
    cancelled: 'danger',
  };

  constructor(
    private modal: NgbActiveModal,
    private orderService: OrderManagementService,
    private toaster: ToastService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    if (this.orderType == 'available') {
      this.orderService.getAvailableOrder(this.pagingSorting).subscribe(
        ({ result }) => {
          this.orders = result;
        },
        error => {
          this.toaster.popError('Error fetching data');
        }
      );
    } else if (this.orderType == 'in transit') {
      this.orderService.getTransit(this.pagingSorting).subscribe(
        ({ result }) => {
          this.orders = result;
        },
        error => {
          this.toaster.popError('Error fetching data');
        }
      );
    } else if (this.orderType == 'delivered') {
      this.orderService.getDelivered(this.pagingSorting).subscribe(
        ({ result }) => {
          this.orders = result;
        },
        error => {
          this.toaster.popError('Error fetching data');
        }
      );
    } else if (this.orderType == 'cancelled') {
      this.orderService.getCancelled(this.pagingSorting).subscribe(
        ({ result }) => {
          this.orders = result;
        },
        error => {
          this.toaster.popError('Error fetching data');
        }
      );
    }
  }

  close() {
    this.modal.close();
  }

  dismiss() {
    this.modal.dismiss();
  }

  sendEmail() {
    this.emailStatus = 'sending';
    setTimeout(() => {
      this.emailStatus = 'success';
      this.email = '';
    }, 0);
  }

  onEmailPopoverClose() {
    this.emailStatus = 'pending';
  }
}
