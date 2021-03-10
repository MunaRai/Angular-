
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { ClientMasterFormPopupComponent } from '../client-master-form-popup/client-master-form-popup.component';
import { Helper } from '@shared/helpers/helper';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { ClientMaster } from '@shared/models/client-master.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { ToastService } from '@shared/services/toast.service';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ClientMasterServiceService } from '../client-master-service.service';

@Component({
  selector: 'p2s-client-master',
  templateUrl: './client-master.component.html',
  styleUrls: ['./client-master.component.scss']
})
export class ClientMasterComponent implements OnInit {

  @Input()
  data: ClientMaster[] = [];

  selectedClientMaster: ClientMaster;

  clientMasters: ClientMaster[] = [];

  pagingSorting: PaginationResult = new PaginationResult();


  constructor(
    private modal: NgbModal,
    private helper: Helper,
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private clientMasterService: ClientMasterServiceService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.clientMasterService.getClientMaster(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(
        ({ paginationResult, result, meta }) => {
          this.clientMasters = result;
          this.pagingSorting.totalPages = paginationResult.totalPages;
        },
        error => {
          this.toastr.popError('Error fetching data');
        }
      );
  }

  showClientMasterPopup(mode) {
    const modal = this.modal.open(ClientMasterFormPopupComponent, { size: 'lg' });
    const clientMaster: ClientMaster = mode === 'edit' ? this.selectedClientMaster : new ClientMaster();
    modal.componentInstance.clientMasterId = clientMaster;
    modal.componentInstance.mode = mode;

    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.clientMasterService.addClientMaster(data)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
            // if(res === 201 || res === 200){
            this.toastr.popSucces('Client master added.');
            this.clientMasters.unshift(res.result);
            // }
            sub.unsubscribe();
            },
            err => {
            this.toastr.popError('Problem while adding client master.')
            sub.unsubscribe();     
            }
          );
        }else{
          const idx = this.clientMasters.indexOf(this.selectedClientMaster);
          const sub = this.clientMasterService.updateClientMaster(data, this.selectedClientMaster['clientMasterId'])
            .finally(() => this.spinner.hide())
            .subscribe(
                
            res => {
              if (res.code === 201 || res.code ===200 ) {
                this.clientMasters[idx] = res.result;
                this.toastr.popSucces('Client master details modified');
                this.selectedClientMaster = null;
                sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying client master details.');
                sub.unsubscribe();
              }
            );
        }
      },
      cancel => { }
    );
  }

  delete(): void {
    const modal = this.modal.open(DeleteConfirmationPopupComponent);
    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.data.indexOf(this.selectedClientMaster);
        const sub = this.clientMasterService.deleteClientMaster(this.selectedClientMaster.clientMasterId)
          .subscribe(
            res => {
              this.spinner.hide();
              if (res.code === 200) {
                this.data[idx] = res.result;
                this.toastr.popSucces('Client Master removed.');
                this.data.splice(idx, 1);
                this.selectedClientMaster = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.spinner.hide();
              this.toastr.popError('Error removing the Client Master.');
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

  gotopage(page) {
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
      this.clientMasterService.searchClient(keyword)
        .subscribe(
          data => {
            this.clientMasters = data.result;
            this.spinner.hide();
          },
          error => {
            this.spinner.hide();
          }
        );
    }
  }

}
