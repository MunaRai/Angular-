import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DriverManagementPopupComponent } from '../driver-management-popup/driver-management-popup.component';
import { DriverManagementServiceService } from '../../service/driver-management-service.service';
import { Driver } from '@shared/models/driver.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { ToastService } from '@shared/services/toast.service';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';

@Component({
  selector: 'p2s-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss']
})
export class DriverManagementComponent implements OnInit {

  drivers: Driver[]=[];

  selectedIndex = -1;
  
  selectedDriver: Driver;

  pagingSorting: PaginationResult = new PaginationResult();


  constructor(
    private modal:NgbModal,
    private toastr: ToastService,
    private driverService: DriverManagementServiceService,
    private spinner: NgxSpinnerService

    ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.driverService.getDrivers(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(({ paginationResult, result , meta}) => {

        this.drivers = result;
      },
        error => {
        });
  }

  showDriverPopup(mode:string):void{
    const driver: Driver = mode === 'edit' ? this.selectedDriver : new Driver();
    const modal = this.modal.open(DriverManagementPopupComponent,{size:'lg'});

    modal.componentInstance.mode = mode;
    modal.componentInstance.user = driver;

    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.driverService.addDriver(data)
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                if (res.code === 201) {
                  this.toastr.popSucces('Driver created');
                  this.drivers.unshift(res.result);
                }
                sub.unsubscribe();
              },
              err => {
                this.toastr.popError('Error creating driver');
                sub.unsubscribe();
              }
            );
        } else {
          const idx = this.drivers.indexOf(this.selectedDriver);
          const sub = this.driverService.updateDriver(data, this.selectedDriver['orderMngDriverId'])
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                if (res.code === 201 || res.code === 200) {
                  this.drivers[idx] = res.result;
                  this.toastr.popSucces('Driver details modified');
                  this.selectedDriver = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying driver details.');
                sub.unsubscribe();
              }
            );
        }
      },
      cancel => { }
    );
  }

  delete() {
    const modal: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);
    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.drivers.indexOf(this.selectedDriver);
        const sub = this.driverService.deleteDriver(this.selectedDriver.orderMngDriverId)
        .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.drivers[idx] = res.result;
                this.toastr.popSucces('Driver removed.');
                this.drivers.splice(idx, 1);
                this.selectedDriver = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while removing Driver.');
              sub.unsubscribe();
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
  onSearch(keyword) {
    keyword = keyword.trim();
    this.spinner.show();
    if(keyword === '') {
      this.fetchData();
    }
    else {
      this.driverService.searchDriver(keyword)
        .subscribe(
          data => {
            this.drivers = data.result;
            this.spinner.hide();
          },
          error => {
            this.spinner.hide();
          }
        );
    }
  }


}
