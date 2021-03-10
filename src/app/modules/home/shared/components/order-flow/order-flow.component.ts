import { Component, OnInit } from '@angular/core';
import { ToastService } from '@shared/services/toast.service';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { OrderManagementService } from '../../../../order-management/services/order-management.service';
import { Order } from '@shared/models/order.model';
import { PaginationResult } from '@shared/models/pagination-result.model';

@Component({
  selector: 'p2s-order-flow',
  templateUrl: './order-flow.component.html',
  styleUrls: ['./order-flow.component.scss']
})
export class OrderFlowComponent implements OnInit {

  orders: Order[] = [];
  expanded: any;

  pagingSorting: PaginationResult = new PaginationResult();

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private orderService: OrderManagementService) { }

  ngOnInit() {
    this.fetchOrderFlow();
  }

  fetchOrderFlow() {
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

}
