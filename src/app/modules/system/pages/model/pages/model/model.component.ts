import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelFormComponent } from '../../shared/model-form/model-form.component';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ModelService } from '../../service/model.service';
import { ToastService } from '@shared/services/toast.service';
import { Model } from '@shared/system-models/model.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';

@Component({
  selector: 'p2s-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  @Input()
  model: Model = new Model();

  selectedModel: Model;

  mode = 'add';

  models: Model[] = [];

  tempModels: Model[] = [];

  calenderList: any[] = [];

  pagingSorting: PaginationResult = new PaginationResult();

  constructor(
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private modelService: ModelService,
    private toastr: ToastService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.modelService.getModelsDetail(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(
        ({ paginationResult, result, meta }) => {
          this.models = result;
          this.tempModels = result;
          this.pagingSorting.totalPages = meta.totalPages;
          this.pagingSorting.page = meta.currentPage;
          // this.pagingSorting = paginationResult || new PaginationResult();
        },
        error => {
        }
      );
  }

  showModelPopUpForm(mode: string): void {
    const model: Model = mode === 'edit' ? this.selectedModel : new Model();
    const modal: NgbModalRef = this.modal.open(ModelFormComponent, { size: 'sm' });

    modal.componentInstance.mode = mode;
    modal.componentInstance.model = model;

    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.modelService.addModel(data)
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                this.toastr.popSucces('Model Created');
                this.models.unshift(res.result);
                sub.unsubscribe();
              },
              error => {
                this.toastr.popError('Error creating model');
                sub.unsubscribe();
              }
            );
        } else {
          const idx = this.models.indexOf(this.selectedModel);
          const sub = this.modelService.updateModel(data)
            .finally(() => this.spinner.hide())
            .subscribe(

              res => {
                if (res.code === 201 || res.code === 200) {
                  this.models[idx] = res.result;
                  this.toastr.popSucces('Model details modified');
                  this.selectedModel = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying model details.');
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
        const idx = this.models.indexOf(this.selectedModel);
        const sub = this.modelService.deleteModel(this.selectedModel.modelId)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.models[idx] = res.result;
                this.toastr.popSucces('model removed.');
                this.models.splice(idx, 1);
                this.selectedModel = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while removing the model.');
              sub.unsubscribe();
            }
          );
      },
      no => { }
    );
  }

  onSearch(keyword) {
    keyword = keyword.trim();
    if (keyword === '' && keyword == null) {
      this.models = this.tempModels;
    } else {
      this.models = this.tempModels.filter(model => {
        return model.modelName.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
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
