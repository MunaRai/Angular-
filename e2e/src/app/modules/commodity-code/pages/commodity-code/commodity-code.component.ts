import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommodityCodeFormPopupComponent } from '../commodity-code-form-popup/commodity-code-form-popup.component';
import { deepClone } from '@shared/helpers/helper';
import {
  DeleteConfirmationPopupComponent
} from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { CommodityCodeServiceService } from '../commodity-code-service.service';
import { ToastService } from '@shared/services/toast.service';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { CommodityCode } from '@shared/models/commodity-code.model';
import { PaginationResult } from '@shared/models/pagination-result.model';

@Component({
  selector: 'p2s-commodity-code',
  templateUrl: './commodity-code.component.html',
  styleUrls: ['./commodity-code.component.scss']
})
export class CommodityCodeComponent implements OnInit {

  commodityCodes: CommodityCode[] = [];

  @Input()
  data: CommodityCode[] = [];

  selectedIndex = -1;

  selectedCommodity: CommodityCode;

  pagingSorting: PaginationResult = new PaginationResult();

  constructor(
    private modal: NgbModal,
    private commodityService: CommodityCodeServiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.commodityService.getCommodity(this.pagingSorting)
    .finally(() => this.spinner.hide())
      .subscribe(
        ({ paginationResult, result, meta }) => {
          this.commodityCodes = result;
          this.pagingSorting.totalPages =  paginationResult.totalPages;
        },
        error => {
          this.toastr.popError('Error fetching data');
        }
      );
  }

  showCommodityPopup(mode: string): void {
    const modal = this.modal.open(CommodityCodeFormPopupComponent, { size: 'sm' });

    const commodity: CommodityCode = mode === 'edit' ? this.selectedCommodity : new CommodityCode();
    modal.componentInstance.commodityCode = commodity;
    modal.componentInstance.mode = mode;

    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.commodityService.addCommodity(data)
          .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                // if(res === 201 || res === 200){
                this.toastr.popSucces('Commodity added.');
                this.commodityCodes.unshift(res.result);
                // }
                sub.unsubscribe();
              },
              err => {
                this.toastr.popError('Problem while adding commodity.')
                sub.unsubscribe();
              }
            );
          } else {
            const idx = this.commodityCodes.indexOf(this.selectedCommodity);
            const sub = this.commodityService.updateCommodity(data, this.selectedCommodity['commodityCodeId'])
            .finally(() => this.spinner.hide())
              .subscribe(

                res => {
                  if (res.code === 201 || res.code ===200 ) {
                    this.commodityCodes[idx] = res.result;
                    this.toastr.popSucces('Commodity details modified');
                    this.selectedCommodity = null;
                    sub.unsubscribe();
                  }
                },
                err => {
                  this.toastr.popError('Error modifying commodity details.');
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
        const idx = this.data.indexOf(this.selectedCommodity);
        const sub = this.commodityService.deleteCommodity(this.selectedCommodity.commodityCodeId)
          .subscribe(
            res => {
              this.spinner.hide();
              if (res.code === 200) {
                this.data[idx] = res.result;
                this.toastr.popSucces('Commodity removed.');
                this.data.splice(idx, 1);
                this.selectedCommodity = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.spinner.hide();
              this.toastr.popError('Error removing the Commodity.');
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
      this.commodityService.searchCommodity(keyword)
        .subscribe(
          data => {
            this.commodityCodes = data.result;
            this.spinner.hide();
          },
          error => {
            this.spinner.hide();
          }
        );
    }
  }
  // onSearch(keyword) {
  //   keyword = keyword.trim();
  //   this.spinner.show();
  //   if(keyword === '') {
  //     this.fetchData();
  //   }
  //   else {
  //     this.commodityService.searchCommodity(keyword)
  //       .subscribe(
  //         data => {
  //           this.commodityCodes = data.result;
  //           this.spinner.hide();
  //         },
  //         error => {
  //           this.spinner.hide();
  //         }
  //     );
  //   }
  // }

}
