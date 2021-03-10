import { Component, OnInit, Input } from '@angular/core';
import { License } from '@shared/system-models/license.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { LicenseService } from '../../services/license.service';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { LicenseFormComponent } from '../../shared/license-form/license-form.component';

@Component({
  selector: 'p2s-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {

  @Input()
  license: License = new License();

  heading = 'License';

  mode = 'add';

  selectedLicense: License;

  pagingSorting: PaginationResult = new PaginationResult();

  licenses: License[] = [];

  tempLicenses: License[] = [];

  // keyword = '';

  constructor(
    private licenseService: LicenseService,
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastService
  ) { }

  ngOnInit() {
    this.fetchData();
  }


  fetchData() {
    this.spinner.show();
    this.licenseService.getLicenseDetails(this.pagingSorting)
    .finally(() => this.spinner.hide())
      .subscribe(
        ({ paginationResult, result }) => {
          this.licenses = result;
          this.tempLicenses = result;
          // this.pagingSorting = paginationResult || new PaginationResult();
          this.pagingSorting.totalPages  = paginationResult.totalPages;
        },
        error => {
        }
      );
  }


  showLicensePopUpForm(mode: string): void {
    const license: License = mode === 'edit' ? this.selectedLicense : new License();
    const modal: NgbModalRef = this.modal.open(LicenseFormComponent, { size: 'sm' });

    modal.componentInstance.mode = mode;
    modal.componentInstance.license = license;


    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.licenseService.addLicense(data)
          .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                  this.toastr.popSucces('License Created');
                  this.licenses.unshift(res.result);
                sub.unsubscribe();
              },
              error => {
                this.toastr.popError('Error creating License');
                sub.unsubscribe();
              }
            );
        } else {
          const idx = this.licenses.indexOf(this.selectedLicense);
          const sub = this.licenseService.updateLicense(data)
          .finally(() => this.spinner.hide())
            .subscribe(

              res => {
                if (res.code === 201 || res.code === 200 ) {
                  this.licenses[idx] = res.result;
                  this.toastr.popSucces('License details modified');
                  this.selectedLicense = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying License details.');
                sub.unsubscribe();
              }
            );
        }
      },
      cancel => { }
    );

  }


  delete() {
    const license: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);
    license.result.then(
      yes => {
        this.spinner.show();
        const idx = this.licenses.indexOf(this.selectedLicense);
        const sub = this.licenseService.deleteLicense(this.selectedLicense.licenseId)
        .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.licenses[idx] = res.result;
                this.toastr.popSucces('License removed.');
                this.licenses.splice(idx, 1);
                this.selectedLicense = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while removing license.');
              sub.unsubscribe();
            }
          );
      },
      no => { }
    );
  }


  onSearch(keyword) {
    keyword = keyword.trim();
    if(keyword == '' && keyword == null) {
      this.licenses = this.tempLicenses;
    }else{
      this.licenses = this.tempLicenses.filter(function(license) {
        return (
          license.licenseName.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
          license.licenseType.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
          license.licenseDescription.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
        )
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



}
