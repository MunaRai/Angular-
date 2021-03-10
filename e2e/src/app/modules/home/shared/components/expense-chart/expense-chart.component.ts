import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddExpensePopupComponent } from './add-expense-popup/add-expense-popup.component';
import { Helper } from '@shared/helpers/helper';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ExpenseChartService } from '../expense-chart.service';
import { Expense } from '@shared/models/expense.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { ToastService } from '@shared/services/toast.service';
import 'rxjs/add/operator/finally';
import { Tracker } from '@shared/models/tracker.model';

@Component({
  selector: 'p2s-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss'],
})
export class ExpenseChartComponent implements OnChanges {
  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  @Input()
  selectedTracker: Tracker;

  currentTrackerId: string;

  @Input()
  data: Expense[] = [];

  @Input()
  expense: Expense[] = [];

  selectedItem: Tracker = null;

  isPanelOpen = true;

  date = new Date();

  totalExpense = 0;

  @Input()
  selectedExpense: Expense;

  chartData = {
    chartType: 'PieChart',
    dataTable: [
      ['Type', 'Cost']
      
    ],
    formatters: [
      {
        columns: [1],
        options: {
          prefix: 'Rs ', negativeColor: 'red', negativeParens: true
        },
        
        type: 'NumberFormat',
      }
    ],
    options: {
      title: '',
      allowHtml: true,
      chartArea: {
        left: 15,
        top: 15,
        width: '100%',
        height: '100%',
      },
      height: 300,
    },
  };

  noData = false;

  constructor(
    private modal: NgbModal,
    private helper: Helper,
    private spinner: NgxSpinnerService,
    private expenseService: ExpenseChartService,
    private toaster: ToastService
  ) {}

  ngOnChanges(changes) {
    if (this.selectedTracker.trackerId !== this.currentTrackerId) {
      this.fetchData();
      this.currentTrackerId = this.selectedTracker.trackerId;
    }
  }

  fetchData() {
    this.spinner.show();
    this.expenseService
      .getExpense(this.selectedTracker.trackerId)
      .finally(() => this.spinner.hide())
      .subscribe(
        (data) => {
          if (data && data.result.length) {
            this.noData = false;

            let dataList = [];
            dataList = [['Type','Cost']];
            data.result.forEach(expense => {
              dataList.push([expense.expenseType,expense.expenseAmount]);
            });
            
            this.chartData = Object.assign({}, this.chartData, {dataTable: dataList});
            
            this.totalExpense = data.meta;
          } else {
            const dataTable = [
              ['Type', 'Cost'],
              ['Fuel', 500],
              ['Maintenance', 300],
              ['Driver Salary', 10000],
            ];
            this.chartData = Object.assign({}, this.chartData, { dataTable });
            this.noData = true;
            this.totalExpense = data.meta;
          }
        },
        err => {}
      );
  }

  showAddExpensePopup(evt, mode): void {
    // to prevent collapsing of the panel;
    evt.stopPropagation();
    evt.preventDefault();

    const modal: NgbModalRef = this.modal.open(AddExpensePopupComponent, {
      size: 'lg',
    });
    modal.componentInstance.mode = mode;

    modal.result.then(
      data => {
        this.spinner.show();
        this.expenseService
          .createExpense(data, this.selectedTracker.trackerId)
          .finally(() => this.spinner.hide())
          .subscribe(
            success => {
              this.toaster.popSucces('Added new expense.');
              this.fetchData();
              this.expense.unshift(data);
            },
            err => {
              this.toaster.popError('Error adding new expense.');
            }
          );
      },
      cancel => {}
    );
  }

  delete() {
    const modal: NgbModalRef = this.modal.open(
      DeleteConfirmationPopupComponent
    );

    modal.result.then(
      yes => {
        const idx = this.data.indexOf(this.selectedExpense);
        this.data.splice(idx, 1);
        this.selectedExpense = null;
      },
      no => {}
    );
  }

  next() {
    this.fetchData();
  }

  previous() {
    this.fetchData();
  }

  gotoPage(page) {
    this.fetchData();
  }

  changeLimit(limit) {
    this.fetchData();
  }
}
