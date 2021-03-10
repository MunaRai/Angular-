import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Tracker } from '@shared/models/tracker.model';
import { Order } from '@shared/models/order.model';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { OrderAssignService } from '../../service/order-assign.service';
import { OrderManagementService } from '../../../order-management/services/order-management.service';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { OrderAssign } from '@shared/models/order-assign.model';
import { NgbModal, NgbModalRef } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { OrderAssignPopupComponent } from './order-assign-popup/order-assign-popup.component';
import { OrderCancelPopupComponent } from './order-cancel-popup/order-cancel-popup.component';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { ViewOrderAssignComponent } from '../view-order-assign/view-order-assign.component';

@Component({
  selector: 'p2s-order-assign',
  templateUrl: './order-assign.component.html',
  styleUrls: ['./order-assign.component.scss']
})
export class OrderAssignComponent implements OnInit {

  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  @Input()
  assignedOrder: OrderAssign[] = [];

   selectedIndex = -1;

  trackers: Tracker[] = [];

  selectedAssignOrder: OrderAssign;

  selectedTracker: Tracker;

  assignedOrders: OrderAssign[] = [];

  pagingSorting: PaginationResult = new PaginationResult();

  constructor(
    private spinner: NgxSpinnerService,
    private modal: NgbModal,
    private toastr: ToastService,
    private assignService: OrderAssignService,
    private toaster: ToastService,
    private orderService: OrderManagementService
  ) { }

  ngOnInit() {
    this.fetchData();

  }

  fetchData() {
    this.spinner.show();
    this.assignService.getOrderAssignList(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(
        ({ paginationResult, result, meta }) => {
          this.assignedOrders = result;
          // this.pagingSorting.totalPages =  paginationResult.totalPages;
        },
        error => {
          this.toastr.popError('Error fetching data');
        }
      );
  }
  delete() {
    const modal: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);
    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.assignedOrders.indexOf(this.selectedAssignOrder);
        const sub = this.assignService.deleteAssign(this.selectedAssignOrder.orderAssignId)
        .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.assignedOrders[idx] = res.result;
                this.toastr.popSucces('Assigned Order removed.');
                this.assignedOrders.splice(idx, 1);
                this.selectedAssignOrder = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while removing assigned order.');
              sub.unsubscribe();
            }
          );
      },
      no => { }
    );
  }


  onTrackerSelect(tracker) {
    this.selectedTracker = Object.assign({}, tracker);
  }

  showOrderAssignPopUpForm(mode:string):void{
    const orderAssign: OrderAssign = mode === 'edit' ? this.selectedAssignOrder: new OrderAssign();
    const modal: NgbModalRef = this.modal.open(OrderAssignPopupComponent, { windowClass: 'xl' });

    modal.componentInstance.mode = mode;
    modal.componentInstance.orderAssign = orderAssign;


    modal.result.then(
      data => {
        this.spinner.show();
        if (mode ==='add') {
          const sub = this.assignService.assignOrder(data)
          .finally(() => this.spinner.hide())
            .subscribe(
           
              res => {
                  this.toastr.popSucces('Order Assigned');
                  this.assignedOrders.unshift(res.result);
                sub.unsubscribe();
              },
              error => {
                this.toastr.popError('Error assigning order');
                sub.unsubscribe();
              }
            );
        }
        else {
          const idx = this.assignedOrders.indexOf(this.selectedAssignOrder);
          const sub = this.assignService.updateOrderAssign(data)
          .finally(() => this.spinner.hide())
            .subscribe(

              res => {
                if (res.code === 201 || res.code === 200 ) {
                  this.assignedOrders[idx] = res.result;
                  this.toastr.popSucces('Order Assign details modified');
                  this.selectedAssignOrder = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying order assign details.');
                sub.unsubscribe();
              }
            );
        }
      },
      cancel => { }
    );

  }
  
  onSearch(keyword) {
    this.assignService.searchAssignOrder(keyword)
      .subscribe(
        data => {
        },
        error => {
        }
      );
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

  onProcessing() {

  }

  onCancel() {
    const modal: NgbModalRef = this.modal.open(OrderCancelPopupComponent, { windowClass: 's' });
    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.assignedOrders.indexOf(this.selectedAssignOrder);
        const sub = this.assignService.cancelAssignedOrder(this.selectedAssignOrder.orderAssignId)
        .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.assignedOrders[idx] = res.result;
                this.toastr.popSucces('Assigned Order Cancelled.');
                this.assignedOrders.splice(idx, 1);
                this.selectedAssignOrder = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while cancelling Assigned Order.');
              sub.unsubscribe();
            }
          );
      },
      no => { }
    );
  }
  viewAssignedOrdeDetails(assignedOrder: OrderAssign) {
    const modal: NgbModalRef = this.modal.open(ViewOrderAssignComponent, { size: 'lg' });
    modal.componentInstance.distributor = assignedOrder;
    // window.open(document.location.href);

  }
}
