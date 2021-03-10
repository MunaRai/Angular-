import { Component, OnInit, Input } from '@angular/core';
import { Tracker } from '@shared/system-models/tracker.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { TrackerFormComponent } from '../../shared/tracker-form/tracker-form.component';
import { TrackerService } from '../../service/tracker.service';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { Model } from '@shared/system-models/model.model';
import { ModelService } from '../../../model/service/model.service';

@Component({
  selector: 'p2s-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit {
  @Input()
  tracker: Tracker = new Tracker();

  models: Model[] = [];

  selectedTracker: Tracker;

  pagingSorting: PaginationResult = new PaginationResult();

  trackers: Tracker[] = [];

  tempTrackers: Tracker[] = [];

  mode = 'add';

  size : number;

  // keyword = '';

  constructor(
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private trackerService: TrackerService,
    private toastr: ToastService,
    private modelService: ModelService
  ) {}

  ngOnInit() {
    this.fetchModelNames();
    this.fetchData();
  }

  // fetch every model names of the devices
  fetchModelNames() {
    this.modelService.getAllModelNames().subscribe(
      ({ result }) => {
        this.models = result;
      },
      error => {
        console.error('Error while fetching model names', error);
      }
    );
  }

  fetchData() {
    this.spinner.show();
    this.trackerService
      .getTrackerDetail(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(
        ({ result, paginationResult }) => {
          this.trackers = result;
          this.tempTrackers = result;

          this.pagingSorting = paginationResult || new PaginationResult();
          this.pagingSorting.page = paginationResult.currentPage;
          this.pagingSorting.totalPages = paginationResult.totalPages;

        },
        error => {}
      );
  }

  showTrackerPopUpForm(mode: string): void {
    const tracker: Tracker =
      mode === 'edit' ? this.selectedTracker : new Tracker();
    const modal: NgbModalRef = this.modal.open(TrackerFormComponent, {
      size: 'sm',
    });

    modal.componentInstance.mode = mode;
    modal.componentInstance.tracker = tracker;

    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.trackerService
            .addTracker(data)
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
                this.toastr.popError('Error creating Tracker');
                sub.unsubscribe();
              }
            );
        } else {
          const idx = this.trackers.indexOf(this.selectedTracker);
          const sub = this.trackerService
            .updateTracker(data)
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
      cancel => {}
    );
  }

  delete() {
    const modal: NgbModalRef = this.modal.open(
      DeleteConfirmationPopupComponent
    );

    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.trackers.indexOf(this.selectedTracker);
        const sub = this.trackerService
          .deleteTracker(this.selectedTracker.trackerId)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.trackers[idx] = res.result;
                this.toastr.popSucces('tracker removed.');
                this.trackers.splice(idx, 1);
                this.selectedTracker = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while removing the tracker.');
              sub.unsubscribe();
            }
          );
      },
      no => {}
    );
  }

  onSearch(keyword) {
    keyword = keyword.trim();
    if (keyword == '' && keyword == null) {
      this.trackers = this.tempTrackers;
    } else {
      this.trackers = this.tempTrackers.filter(function(tracker) {
        return (
          tracker.trackerImeiNumber.toString().indexOf(keyword) >= 0 ||
          tracker.trackerSimNumber.toString().indexOf(keyword) >= 0 ||
          tracker.trackerModelName
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) >= 0
        );
      });
    }
  }

  next() {
    this.pagingSorting.page++;
    this.size = this.pagingSorting.size;
    this.fetchData();
  }

  previous() {
    this.pagingSorting.page--;
    this.fetchData();
  }

  gotoPage(page) {
    if (page <= this.pagingSorting.totalPages && page > 0) {
      this.pagingSorting.page = page;
      this.fetchData();
    } else {
      this.fetchData();
    }
  }

  changeLimit(limit) {
    this.pagingSorting.size = limit;
    this.size = this.pagingSorting.size;
    this.fetchData();
  }
}
