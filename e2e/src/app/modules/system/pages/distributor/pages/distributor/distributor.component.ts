import { Component, OnInit, Input } from '@angular/core';
import { Distributor } from '@shared/system-models/distributor.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { DistributorFormComponent } from '../../shared/distributor-form/distributor-form.component';
import { DistributorService } from '../../services/distributor.service';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { TrackerAssignComponent } from '../tracker-assign/tracker-assign.component';
import { LicenseAssignComponent } from '../license-assign/license-assign.component';
import { Tracker } from '@shared/system-models/tracker.model';
import { TrackerService } from '../../../tracker/service/tracker.service';
import { ViewDistributorComponent } from '../view-distributor/view-distributor.component';
import { UnAssignTrackerComponent } from '../un-assign-tracker/un-assign-tracker.component';

@Component({
  selector: 'p2s-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.scss']
})
export class DistributorComponent implements OnInit {

  @Input()
  distributor: Distributor = new Distributor();

  heading = 'User Role';

  selectedDistributor: Distributor;

  pagingSorting: PaginationResult = new PaginationResult();

  distributors: Distributor[] = [];

  tempDistributors: Distributor[] = [];

  allTrackers: Tracker[] = [];

  constructor(
    private distributorService: DistributorService,
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private trackerService: TrackerService,
  ) { }

  ngOnInit() {
    this.fetchAllTrackers();
    this.fetchData();
  }



  fetchData() {
    this.spinner.show();
    this.distributorService.getDistributorsDetails(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(
        ({ paginationResult, result }) => {
          this.distributors = result;
          this.tempDistributors = result;
          this.pagingSorting.totalPages = paginationResult.totalPages;
        },
        error => {
          console.error('error fetching distributors', error);
        }
      );
  }

  showDistributorPopUpForm(mode: string): void {
    const distributor: Distributor = mode === 'edit' ? this.selectedDistributor : new Distributor();
    const modal: NgbModalRef = this.modal.open(DistributorFormComponent, { size: 'lg' });

    modal.componentInstance.mode = mode;
    modal.componentInstance.distributor = distributor;


    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.distributorService.addDistributor(data)
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                this.toastr.popSucces('Distributor Created');
                this.distributors.unshift(res.result);
                sub.unsubscribe();
              },
              err => {
                console.error(err);
                this.toastr.popError('Error creating Distributor');
                sub.unsubscribe();
              }
            );
        } else {
          const idx = this.distributors.indexOf(this.selectedDistributor);
          const sub = this.distributorService.updateDistributor(data)
            .finally(() => this.spinner.hide())
            .subscribe(

              res => {
                if (res.code === 201 || res.code === 200) {
                  this.distributors[idx] = res.result;
                  this.toastr.popSucces('Distributor details modified');
                  this.selectedDistributor = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying Distributor details.');
                sub.unsubscribe();
              }
            );
        }
      },
      cancel => { }
    );

  }



  openTrackerAssignPopUp(distributor: Distributor): void {
    const modal: NgbModalRef = this.modal.open(TrackerAssignComponent, { size: 'lg' });
    modal.componentInstance.distributor = distributor;

    modal.result.then(
      data => {
        this.spinner.show();
        const sub = this.distributorService.assignTrackerToDistributor(data)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              this.toastr.popSucces('Tracker Assigned to Distributor : ' + distributor.distributorName);
              sub.unsubscribe();
            },
            error => {
              this.toastr.popError('Error Assigning tracker to Distributor : ' + distributor.distributorName);
              sub.unsubscribe();
            }
          );
      },
      cancel => { }
    );
  }

  openLicenseAssignPopUp(distributor: Distributor): void {
    const modal: NgbModalRef = this.modal.open(LicenseAssignComponent, { size: 'lg' });
    modal.componentInstance.distributor = distributor;

    modal.result.then(
      data => {
        this.spinner.show();
        const sub = this.distributorService.assignLicenseToDistributor(data)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              this.toastr.popSucces('License Assigned to Distributor : ' + distributor.distributorName);
              sub.unsubscribe();
            },
            error => {
              this.toastr.popError('Error Assigning license to Distributor : ' + distributor.distributorName);
              sub.unsubscribe();
            }
          );
      },
      cancel => { }
    );
  }


  openTrackerUnAssignPopUp(distributor: Distributor): void {
    const modal: NgbModalRef = this.modal.open(UnAssignTrackerComponent, { size: 'lg' });

    modal.componentInstance.distributor = distributor;

    modal.result.then(
      data => {
        this.spinner.show();
        const sub = this.distributorService.unAssignTrackerFromDistributor(data)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              this.toastr.popSucces('Tracker UnAssigned From Distributor : ' + distributor.distributorName);
              sub.unsubscribe();
            },
            error => {
              this.toastr.popError('Error UnAssigning tracker to Distributor : ' + distributor.distributorName);
              sub.unsubscribe();
            }
          );
      },
      cancel => { }
    );

  }

  delete() {
    const modal: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);
    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.distributors.indexOf(this.selectedDistributor);
        const sub = this.distributorService.deleteDistributor(this.selectedDistributor.distributorId)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.distributors[idx] = res.result;
                this.toastr.popSucces('Distributor removed.');
                this.distributors.splice(idx, 1);
                this.selectedDistributor = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while removing Distributor.');
              sub.unsubscribe();
            }
          );
      },
      no => { }
    );
  }

  viewDistributorDetail(distributor: Distributor) {
    const modal: NgbModalRef = this.modal.open(ViewDistributorComponent, { size: 'lg' });
    modal.componentInstance.distributor = distributor;
  }

  onSearch(keyword) {
    keyword = keyword.trim();
    if (keyword) {
      this.distributors = this.tempDistributors;
    } else {
      this.distributors = this.tempDistributors.filter(distributor => {
        return (
          distributor.distributorName.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
          distributor.userDto.username.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
        );
      });
    }
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
      this.pagingSorting.page = page;
      this.fetchData();
    } else {
      this.fetchData();
    }
  }

  changeLimit(limit) {
    this.pagingSorting.size = limit;
    this.fetchData();
  }

  fetchAllTrackers() {
    this.trackerService.getAllTrackers()
      .subscribe(
        data => {
          this.allTrackers = data.result;
        },
        error => {
          console.error('Error is', error);
        }
      );
  }
} 
