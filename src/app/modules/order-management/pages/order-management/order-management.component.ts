import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrderManagementFormPopupComponent } from '../order-management-form-popup/order-management-form-popup.component';
import { deepClone } from '@shared/helpers/helper';
import {
  DeleteConfirmationPopupComponent
} from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { Order } from '@shared/models/order.model';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { OrderManagementService } from '../../services/order-management.service';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { Subscription } from 'rxjs/Subscription';
import { OrderCancelPopupComponent } from 'app/modules/order-assign/pages/order-assign/order-cancel-popup/order-cancel-popup.component';

@Component({
  selector: 'p2s-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  @Input()
  data: Order[] = [];

  orders: Order[] = [];

  pagingSorting: PaginationResult = new PaginationResult();

  selectedIndex = -1;

  subscribtion: Subscription;

  selectedOrder: Order;

  expanded: any;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private modal: NgbModal,
    private orderService: OrderManagementService
  ) { }

  ngOnInit() {
    this.fetchData();
    // this.orders.expanded = false;
  }

  fetchData() {
    this.spinner.show();
    this.orderService.getOrder(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(
        ({ paginationResult, result, meta }) => {
          this.orders = result;
          this.pagingSorting.totalPages =  paginationResult.totalPages;
        },
        error => {
          this.toastr.popError('Error fetching data');
        }
      );
  }

  showOrderPopup(mode: string): void {
    const order = mode === 'add' ? new Order() : deepClone(this.orders[this.selectedIndex]);
    const modal = this.modal.open(OrderManagementFormPopupComponent, { windowClass: 'xl' });

    modal.componentInstance.mode = mode;
    modal.componentInstance.order = order;
    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.orderService.addOrder(data)
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                if (res.code === 201 || res.code === 200) {
                  this.toastr.popSucces('Order created');
                  this.data.push(res.result);
                 this.orders.unshift(res.result);
                }
                sub.unsubscribe();
              },
              err => {
                this.toastr.popError('Error creating order');
                sub.unsubscribe();
              }
            );
        } else {
          const idx = this.orders.indexOf(this.selectedOrder);
          const sub = this.orderService.updateOrder(data, this.selectedOrder['orderManagementId'])
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                if (res.code === 201 || res.code === 200) {
                  this.orders[idx] = res.result;
                  this.toastr.popSucces('Order details modified');
                  this.selectedOrder = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying order details.');
                sub.unsubscribe();
              }
            );
        }
      },
      cancel => { }
    );
  }
  onCancel() {
    const modal: NgbModalRef = this.modal.open(OrderCancelPopupComponent, { windowClass: 's' });
    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.orders.indexOf(this.selectedOrder);
        const sub = this.orderService.cancelOrder(this.selectedOrder.orderManagementId)
        .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.orders[idx] = res.result;
                this.toastr.popSucces(' Order Cancelled.');
                this.orders.splice(idx, 1);
                this.selectedOrder = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while cancelling  Order.');
              sub.unsubscribe();
            }
          );
      },
      no => { }
    );
  }

  delete() {
    const modal: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);
    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.orders.indexOf(this.selectedOrder);
        const sub = this.orderService.deleteOrder(this.selectedOrder.orderManagementId)
        .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.orders[idx] = res.result;
                this.toastr.popSucces('Order removed.');
                this.orders.splice(idx, 1);
                this.selectedOrder = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while removing Order.');
              sub.unsubscribe();
            }
          );
      },
      no => { }
    );
  }

  selectAndToggleExpand(order) {
    this.selectedOrder = order; order.expanded = !order.expanded;
  }

  next() {
    this.pagingSorting.page++;
    this.fetchData();
  }

  previous() {
    this.pagingSorting.page--;
    this.fetchData();
  }

  gotoPage(page) {
    if (page <= this.pagingSorting.totalPages && page > 0) {
      this.pagingSorting.totalPages = page;
      this.fetchData();
    } else {
      this.fetchData();
    }
  }

  changeLimit(limit) {
    this.pagingSorting.size = limit;
    this.fetchData();
  }

  onSearch(keyword) {
    keyword = keyword.trim();
    this.spinner.show();
    if(keyword === '') {
      this.fetchData();
    }
    else {
      this.orderService.searchOrder(keyword)
        .subscribe(
          data => {
            this.orders = data.result;
            this.spinner.hide();
          },
          error => {
            this.spinner.hide();
          }
      );
    }
  }

}
