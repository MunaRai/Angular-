import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { OrderAssignService } from '../../service/order-assign.service';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { OrderAssign } from '@shared/models/order-assign.model';

@Component({
  selector: 'p2s-view-order-assign',
  templateUrl: './view-order-assign.component.html',
  styleUrls: ['./view-order-assign.component.scss']
})
export class ViewOrderAssignComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private assignService: OrderAssignService,
  ) { }

  pagingSorting: PaginationResult = new PaginationResult();

  
  assignedOrders: OrderAssign[] = [];

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.assignService.getOrderAssignList(this.pagingSorting)
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
  prints(){
    (window as any).print();
  }

}
