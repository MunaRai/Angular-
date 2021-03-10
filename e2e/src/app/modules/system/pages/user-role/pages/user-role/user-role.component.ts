import { Component, OnInit, Input } from '@angular/core';
import { UserRoleService } from '../../services/user-role.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { UserRole } from '@shared/system-models/user-role.model';
import { UserRoleFormComponent } from '../../shared/user-role-form/user-role-form.component';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';

@Component({
  selector: 'p2s-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  @Input()
  userRole: UserRole = new UserRole();

  heading = 'User Role';

  pagingSorting: PaginationResult = new PaginationResult();

  selectedUserRole: UserRole;

  userRoles: UserRole[] = [];

  tempUserRoles: UserRole[] = [];

  // keyword = '';

  rows: any[] = [];

  constructor(
    private userRoleService: UserRoleService,
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastService
  ) { }

  ngOnInit() {
    this.fetchData();
  }


  fetchData() {
    this.spinner.show();
    this.userRoleService.getUserRolesDetail()
      .finally(() => this.spinner.hide())
      .subscribe(
        ({ result }) => {
          this.userRoles = result;
          this.tempUserRoles = result;
        },
        error => {
          console.error('Error while fetching user roles', error);
        }
      );
  }


  showUserRolePopUpForm(mode: string): void {
    const userRole: UserRole = mode === 'edit' ? this.selectedUserRole : new UserRole();
    const modal: NgbModalRef = this.modal.open(UserRoleFormComponent, { size: 'sm' });

    modal.componentInstance.mode = mode;
    modal.componentInstance.userRole = userRole;


    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.userRoleService.addUserRole(data)
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                this.toastr.popSucces('user Role Created');
                this.userRoles.unshift(res.result);
                sub.unsubscribe();
              },
              error => {
                this.toastr.popError('Error creating User Role');
                sub.unsubscribe();
              }
            );
        } else {
          const idx = this.userRoles.indexOf(this.selectedUserRole);
          const sub = this.userRoleService.updateUserRole(data)
            .finally(() => this.spinner.hide())
            .subscribe(

              res => {
                if (res.code === 201 || res.code === 200) {
                  this.userRoles[idx] = res.result;
                  this.toastr.popSucces('user role details modified');
                  this.selectedUserRole = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying user Role details.');
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
        const idx = this.userRoles.indexOf(this.selectedUserRole);
        const sub = this.userRoleService.deleteUserRole(this.selectedUserRole.roleId)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.userRoles[idx] = res.result;
                this.toastr.popSucces('user Role removed.');
                this.userRoles.splice(idx, 1);
                this.selectedUserRole = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error while removing user Role.');
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
      this.userRoles = this.tempUserRoles;
    }else{
      this.userRoles = this.tempUserRoles.filter(function(userRole) {
        return (
          userRole.roleName.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
          userRole.roleCode.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
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
