import { Component, OnInit, HostBinding, Output } from '@angular/core';
import { User } from '@shared/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TrackerFormPopupComponent } from '../tracker-form-popup/tracker-form-popup.component';
import { Helper } from '@shared/helpers/helper';
import {
  DeleteConfirmationPopupComponent
} from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { TrackerService } from '../../services/tracker.service';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { Tracker } from '@shared/models/tracker.model';
import { ToastService } from '@shared/services/toast.service';
import { Feature } from '@agm/core/services/google-maps-types';
import { OuterSubscriber } from 'rxjs/OuterSubscriber';
import { Meta } from '@angular/platform-browser';
import { MoveTrackerUserComponent } from '../move-tracker-user/move-tracker-user.component';
import { UserDetailService } from '@shared/services/user-detail.service';
import { TrackerUsersListComponent } from '../tracker-users-list/tracker-users-list.component';
import { ShowTrackerDetailsComponent } from '../show-tracker-details/show-tracker-details.component';


@Component({
  selector: 'p2s-tracker-management',
  templateUrl: './tracker-management.component.html',
  styleUrls: ['./tracker-management.component.scss']
})
export class TrackerManagementComponent implements OnInit {

  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  user: User = new User();

  trackers: Tracker[] = [];

  tempTrackers: Tracker[] = [];

  selectedTracker: Tracker;

  features: Feature[] = null;

  // pagingSorting: PaginationResult = new PaginationResult();
  pagingSorting: PaginationResult = new PaginationResult();

  constructor(
    private modal: NgbModal,
    private helper: Helper,
    private spinner: NgxSpinnerService,
    private trackerService: TrackerService,
    private toastr: ToastService,
    private userDetailService: UserDetailService,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.trackerService.getTrackers(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(
        ({ paginationResult, result }) => {
          this.trackers = result;
          this.tempTrackers = result;
          this.pagingSorting.totalPages = paginationResult.totalPages;
          // this.pagingSorting = paginationResult || new PaginationResult();
        },
        error => {
          console.error(error);
        }
      );
  }



  showTrackerPopup(mode: string): void {
    const tracker: Tracker = mode === 'edit' ? this.selectedTracker : new Tracker();
    const modal: NgbModalRef = this.modal.open(TrackerFormPopupComponent, { size: 'lg' });

    modal.componentInstance.mode = mode;
    modal.componentInstance.tracker = tracker;
    modal.componentInstance.user = this.user;
    modal.componentInstance.features = this.features;

    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.trackerService.addTracker(data)
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                // if (res === 201 || res ===200) {
                this.toastr.popSucces('Tracker Created');
                this.trackers.unshift(res.result);
                // }
                sub.unsubscribe();
              },
              error => {
                this.toastr.popError('Error creating tracker');
                sub.unsubscribe();
              }
            );
        } else {

          const idx = this.trackers.indexOf(this.selectedTracker);
          const sub = this.trackerService.updateTracker(data)
            .finally(() => this.spinner.hide())
            .subscribe(

              res => {
                if (res.code === 201 || res.code === 200) {
                  this.trackers[idx] = res.result;
                  this.toastr.popSucces('Tracker details modified');
                  this.selectedTracker = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying tracker details.');
                sub.unsubscribe();
              }
            );
        }
      },
      () => { }
    );
  }

  delete() {
    const modal: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);

    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.trackers.indexOf(this.selectedTracker);
        const sub = this.trackerService.deleteTracker(this.selectedTracker.trackerId)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.trackers[idx] = res.result;
                this.toastr.popSucces('Tracker removed.');
                this.trackers.splice(idx, 1);
                this.selectedTracker = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while removing the tracker.');
              sub.unsubscribe();
              console.error(err);
            }
          );
      },
      no => { }
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

  // search the tracker list according to the keyword // backend
  // onSearch(keyword) {
  //   //removing the leading white spaces
  //   keyword = keyword.trim();
  //   this.spinner.show();
  //   //for fetching every list of trackers
  //   if(keyword === '') {
  //     this.fetchData();
  //   }
  //   //for searching tracker according to the keyword
  //   else {
  //     this.trackerService.searchTracker(keyword)
  //       .subscribe(
  //         data => {
  //           this.trackers = data.result;
  //           this.spinner.hide();
  //         },
  //         error => {
  //           this.spinner.hide();
  //         }
  //     );
  //   }
  // }

  // search from frontend
  onSearch(keyword) {
    keyword = keyword.trim();
    if (!keyword) {
      this.trackers = this.tempTrackers;
    } else {
      this.trackers = this.tempTrackers.filter(function (tracker) {
        return (
          tracker.trackerImeiNumber.toString().indexOf(keyword) >= 0 ||
          // tracker.trackerName.indexOf(keyword) >= 0 ||
          tracker.trackerSimNumber.toString().indexOf(keyword) >= 0 ||
          tracker.trackerModelName.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
        );
      });
    }
  }

  openMoveTrackerToUser(tracker) {
    const modal: NgbModalRef = this.modal.open(MoveTrackerUserComponent, { size: 'lg' });
    modal.componentInstance.tracker = tracker;

    modal.result.then(
      data => {
        this.spinner.show();
        const sub = this.trackerService.assignTrackerToNewUsers(data)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              this.toastr.popSucces('Tracker Assigned To Other Users');
              sub.unsubscribe();
            },
            error => {
              this.toastr.popError('Error assigning trackers');
              sub.unsubscribe();
            }
          );
      }
    );
  }

  getCurrentUser() {
    this.userDetailService.fetchUser()
      .subscribe(
        data => {
          this.user = data.result;
        },
        error => {
          console.error('Error while fetching logged in user', error);
        }
      );
  }

  showTrackerUsersList(tracker) {
    const modal: NgbModalRef = this.modal.open(TrackerUsersListComponent, { size: 'sm' });
    modal.componentInstance.tracker = tracker;
  }

  showTrackerDetails(tracker) {
    const modal: NgbModalRef = this.modal.open(ShowTrackerDetailsComponent, { size: 'lg' });
    modal.componentInstance.tracker = tracker;
    modal.componentInstance.user = this.user;
  }

}
