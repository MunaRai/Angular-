import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { ReminderService } from 'app/modules/dashboard/services/reminder.service';
import { Reminder } from '@shared/models/reminder.model';

@Component({
  selector: 'p2s-reminder-bar',
  templateUrl: './reminder-bar.component.html',
  styleUrls: ['./reminder-bar.component.scss']
})
export class ReminderBarComponent implements OnInit {

  reminder: Reminder[] = [];

  count =0;

  pagingSorting: PaginationResult = new PaginationResult();

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private reminderService: ReminderService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.reminderService.getTrigerredReminder(this.pagingSorting)
    .finally(() => this.spinner.hide())
      .subscribe(
        ({ paginationResult, result, meta }) => {
          this.reminder = result;
          this.count = meta;
          // this.pagingSorting.totalPages =  paginationResult.totalPages;
        },
        error => {
          this.toastr.popError('Error fetching data');
        }
      );
  }
  
  mark() {
    this.count = 0;
  }
}
