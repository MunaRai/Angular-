import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Feature } from '@shared/models/feature.model';
import { UserProfileService } from '../../../services/user-profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { FeaturesPermissionsPopupFormComponent } from '../features-permissions-popup-form/features-permissions-popup-form.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { Permission } from '@shared/models/permission.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'p2s-features-permission-panel',
  templateUrl: './features-permission-panel.component.html',
  styleUrls: ['./features-permission-panel.component.scss']
})
export class FeaturesPermissionPanelComponent implements OnInit {

  @Input()
  mode = 'features';

  @Input()
  data: Feature[] = [];


  @Input()
  types: string[] = [];

  selectedItem: Feature;

  fetchingFeatures = false;

  fetchingError = false;

  features: Feature[] = [];

  permissions: Permission[] = [];

  userRole: string;

  constructor(
    private upService: UserProfileService,
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit() {
    if (this.mode === 'features') {
      this.types = ['tracker'];
    } else {
      this.types = ['normal', 'reports'];
    }
    this.fetchData();

    const token = localStorage.getItem('p2s_access_token');
    const user = this.jwtHelper.decodeToken(token).user;
    this.userRole = user.userRole;
  }

  fetchData() {
    this.fetchingFeatures = true;
    this.fetchingError = false;
    if (this.mode === 'features') {
      this.upService.getFeatures()
        .subscribe(
          ({result}) => {
            this.fetchingFeatures = false;
            this.data = result;
          },

          error => {
            this.fetchingFeatures = false;
            this.fetchingError = true;
          }
        );
    } else {
      this.upService.getPermissions()
        .subscribe(
          ({result}) => {
            this.fetchingFeatures = false;
            this.data = result;
          },

          error => {
            this.fetchingFeatures = false;
            this.fetchingError = true;
          }
        );
    }
  }

  onAdd() {
    const modal: NgbModalRef = this.modal.open(FeaturesPermissionsPopupFormComponent, {size: 'sm'});
    modal.componentInstance.mode = this.mode === 'features' ? 'feature' : 'permission';
    modal.componentInstance.types = this.types;

    modal.result.then(
      data => {
        this.spinner.show();
        if (this.mode === 'features') {
          this.upService.createFeature(data)
          .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                this.toastr.popSucces('Feature added successfully');
                this.data.push(res.result);
              },
              err => {
                this.toastr.popError('Problem while adding feature');
              }
            );
        } else {
          this.upService.createPermission(data)
          .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                this.toastr.popSucces('Permission added successfully');
                this.data.push(res.result);
              },
              err => {
                this.toastr.popError('Problem while adding permission');
              }
            );
        }
      },
      cancel => {}
    );
  }

  getItemName(item) {
    return this.mode === 'features' ? item.featureName : item.permissionName;
  }

  onEdit() {
      const modal: NgbModalRef = this.modal.open(FeaturesPermissionsPopupFormComponent, {size: 'sm'});
      modal.componentInstance.mode = this.mode === 'features' ? 'feature' : 'permission';
      modal.componentInstance.types = this.types;
      modal.componentInstance.data = this.selectedItem;
      modal.componentInstance.saveType = 'edit';

      modal.result.then(
        data => {
          this.spinner.show();
          if (this.mode === 'features') {
            const idx = this.data.indexOf(this.selectedItem);
            const sub = this.upService.editFeature(data, this.selectedItem['featureId'])
              .finally(() => this.spinner.hide())
              .subscribe(
                res => {
                  if (res.code === 201 || res.code === 200 ) {
                    this.data[idx] = res.result;
                    this.toastr.popSucces('Features details modified');
                    this.selectedItem = null;
                    sub.unsubscribe();
                  }
                },
                err => {
                  this.toastr.popError('Error modifying feature details.');
                  sub.unsubscribe();
                }
              );
          } else {
            const idx = this.data.indexOf(this.selectedItem);
            const sub = this.upService.editPermission(data, this.selectedItem['permissionId'])
            .finally(() => this.spinner.hide())
              .subscribe(
                res => {
                  if (res.code === 201 || res.code === 200 ) {
                    this.data[idx] = res.result;
                    this.toastr.popSucces('Permission details modified');
                    this.selectedItem = null;
                    sub.unsubscribe();
                  }
                },
                err => {
                  this.toastr.popError('Error modifying permission details.');
                  sub.unsubscribe();
                }
              );
          }
        },
        cancel => {}
      );

  }

  onDelete() {
    const modal: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);

    modal.result.then(
      yes => {
        if (this.mode === 'features') {
        this.spinner.show();
        const idx = this.data.indexOf(this.selectedItem);
        const sub = this.upService.deleteFeature(this.selectedItem.featureId)
          .subscribe(
            res => {
              this.spinner.hide();
              if (res.code === 200) {
                this.data[idx] = res.result;
                this.toastr.popSucces('Feature removed.');
                this.data.splice(idx, 1);
                this.fetchingFeatures = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.spinner.hide();
              this.toastr.popError('Error removing the feature.');
              sub.unsubscribe();
            }
          );
        } else {
          this.spinner.show();
          const idx = this.data.indexOf(this.selectedItem);
          const sub = this.upService.deletePermission(this.selectedItem['permissionId'])
            .subscribe(
              res => {
                this.spinner.hide();
                if (res.code === 200) {
                  this.data[idx] = res.result;
                  this.toastr.popSucces('Permission removed.');
                  this.data.splice(idx, 1);
                  this.fetchingFeatures = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.spinner.hide();
                this.toastr.popError('Error removing the permission.');
                sub.unsubscribe();
              }
            );
        }
      },
      no => { }
    );
  }
}
