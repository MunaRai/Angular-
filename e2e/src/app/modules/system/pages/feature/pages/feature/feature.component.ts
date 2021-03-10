import { Component, OnInit, Input } from '@angular/core';
import { FeatureService } from '../../service/feature.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { FeatureFormComponent } from '../../shared/feature-form/feature-form.component';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { Feature } from '@shared/system-models/feature.model';

@Component({
  selector: 'p2s-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  @Input()
  feature: Feature = new Feature();

  mode = 'add';

  selectedFeature: Feature;

  pagingSorting: PaginationResult = new PaginationResult();

  features: Feature[] = [];

  tempFeatures: Feature[] = [];

  // keyword = '';

  constructor(
    private featureService: FeatureService,
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.featureService.getFeatureDetails(this.pagingSorting)
    .finally(() => this.spinner.hide())
      .subscribe(
        ({ paginationResult, result }) => {
          this.features = result;
          this.tempFeatures = result;
          this.pagingSorting.totalPages = paginationResult.totalPages;
        },
        error => {
        }
      );
  }


  showFeaturePopUpForm(mode: string): void {
    const feature: Feature = mode === 'edit' ? this.selectedFeature : new Feature();
    const modal: NgbModalRef = this.modal.open(FeatureFormComponent, { size: 'sm' });

    modal.componentInstance.mode = mode;
    modal.componentInstance.feature = feature;


    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.featureService.addFeature(data)
          .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                  this.toastr.popSucces('Feature Created');
                  this.features.unshift(res.result);
                sub.unsubscribe();
              },
              error => {
                this.toastr.popError('Error creating Feature');
                sub.unsubscribe();
              }
            );
        } else {
          const idx = this.features.indexOf(this.selectedFeature);
          const sub = this.featureService.updateFeature(data)
          .finally(() => this.spinner.hide())
            .subscribe(

              res => {
                if (res.code === 201 || res.code === 200 ) {
                  this.features[idx] = res.result;
                  this.toastr.popSucces('Feature details modified');
                  this.selectedFeature = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying Feature details.');
                sub.unsubscribe();
              }
            );
        }
      },
      cancel => { }
    );

  }


  delete() {
    const feature: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);
    feature.result.then(
      yes => {
        this.spinner.show();
        const idx = this.features.indexOf(this.selectedFeature);
        const sub = this.featureService.deleteFeature(this.selectedFeature.featureId)
        .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.features[idx] = res.result;
                this.toastr.popSucces('Feature removed.');
                this.features.splice(idx, 1);
                this.selectedFeature = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while removing Feature.');
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
      this.features = this.tempFeatures;
    }else{
      this.features = this.tempFeatures.filter(function(feature) {
        return (
          feature.featureName.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
          feature.featureType.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
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

}
