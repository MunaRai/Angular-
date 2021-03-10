import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GenerateReminderPopupComponent } from '../generate-reminder-popup/generate-reminder-popup.component';
import { ReminderService } from 'app/modules/dashboard/services/reminder.service';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { Reminder } from '@shared/models/reminder.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';

@Component({
  selector: 'p2s-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  // @Input()
  // data: Reminder[] = [];

  @Input()
  reminders: Reminder[] = [];

  selectedIndex = -1;
  reminder: Reminder[] = [];
  tempReminder: Reminder[] = [];

  selectedReminder: Reminder;

  pagingSorting: PaginationResult = new PaginationResult();

  constructor(
    private modal: NgbModal,
    private reminderService: ReminderService,
    private spinner: NgxSpinnerService,
    private toaster: ToastService,

  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.reminderService.getReminder(this.pagingSorting)
    .finally(() => this.spinner.hide())
      .subscribe(
        ({ result }) => {
          this.reminders = result;
          // this.pagingSorting.totalPages =  paginationResult.totalPages;
        },
        error => {
          this.toaster.popError('Error fetching data');
        }
      );
  }

  showReminderPopup(mode: string): void {

    // const rem = mode === 'add' ? new Reminder() : deepClone(this.reminders[this.selectedIndex]);
    const modal = this.modal.open(GenerateReminderPopupComponent, { windowClass: 'xl' });
    const rem: Reminder = mode === 'edit' ? this.selectedReminder : new Reminder();
    modal.componentInstance.mode = mode;
    modal.componentInstance.rem = rem;
    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.reminderService.createReminder(data)
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                if (res.code === 201 || res.code === 200) {
                  this.toaster.popSucces('reminder created');
                  this.reminders.push(res.result);
                }
                sub.unsubscribe();
              },
              err => {
                this.toaster.popError('Error creating reminder');
                sub.unsubscribe();
              }
            );
          } else {
          const idx = this.reminders.indexOf(this.selectedReminder);
          const sub = this.reminderService.updateReminder(data, this.selectedReminder['reminderId'])
          .finally(() => this.spinner.hide())
            .subscribe(

              res => {
                if (res.code === 201 || res.code === 200 ) {
                  this.reminders[idx] = res.result;
                  this.toaster.popSucces('Reminder details modified');
                  this.selectedReminder = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toaster.popError('Error modifying Reminder details.');
                sub.unsubscribe();
              }
            );
        }
      },
      cancel => { }
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

  cancel() {
    // this.modal.close();
  }

  delete() {
    const modal: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);
    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.reminders.indexOf(this.selectedReminder);
        const sub = this.reminderService.deleteReminder(this.selectedReminder.reminderId)
        .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.reminders[idx] = res.result;
                this.toaster.popSucces('Reminder removed.');
                this.reminders.splice(idx, 1);
                this.selectedReminder = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toaster.popError('Error while removing reminder.');
              sub.unsubscribe();
            }
          );
      },
      no => { }
    );
  }
  pause() {
        const idx = this.reminders.indexOf(this.selectedReminder);
        const sub = this.reminderService.pauseReminder(this.selectedReminder.reminderId)
          .subscribe(
            res => {
              if (res.code === 200) {
                this.toaster.popSucces('Reminder paused.');
                sub.unsubscribe();
              }
            },
            err => {
              this.toaster.popError('Error while pausing reminder.');
              sub.unsubscribe();
            }
          );
  }

  resume() {
    const idx = this.reminders.indexOf(this.selectedReminder);
    const sub = this.reminderService.resumeReminder( this.selectedReminder.reminderId)
    .finally(() => this.spinner.hide())
      .subscribe(
        res => {
          if (res.code === 201 || res.code === 200 ) {
            this.toaster.popSucces('Reminder resumed  ');
            sub.unsubscribe();
          }
        },
        err => {
          this.toaster.popError('Error resuming reminder.');
          sub.unsubscribe();
        }
      );
  }

  onSearch(keyword) {
    keyword = keyword.trim();
    if (keyword === '' && keyword == null) {
      this.reminder = this.tempReminder;
    } else {
      this.reminder = this.tempReminder.filter(function(reminders) {
        return reminders.reminderSubject.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
      });
    }
  }

  // search the tracker list according to the keyword
  // onSearch(keyword) {
    // removing the leading white spaces
    // keyword = keyword.trim();
    // this.spinner.show();
    // for fetching every list of trackers
    // if(keyword === '') {
      // this.fetchData();
    // }
    // for searching tracker according to the keyword
    // else {
      // this.reminderService.searchReminder(keyword)
        // .subscribe(
          // data => {
            // this.reminders = data.result;
            // this.spinner.hide();
          // },
          // error => {
            // this.spinner.hide();
          // }
      // );
    // }
  // }

}
