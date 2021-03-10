import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { User } from '@shared/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { addYears } from 'date-fns';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementFormPopupComponent } from '../user-management-form-popup/user-management-form-popup.component';
import {
  DeleteConfirmationPopupComponent} from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { ToastService } from '@shared/services/toast.service';
import { Feature } from '@shared/models/feature.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Tracker } from '@shared/models/tracker.model';
import { Subscription } from 'rxjs/Subscription';
import { CustomerCare } from '@shared/models/customer-care.model';
import { AssignTrackerDistributorComponent } from '../assign-tracker-distributor/assign-tracker-distributor.component';

@Component({
  selector: 'p2s-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  users: User[] = [];
  
  tempUsers: User[] = [];

  customerUsers: User[] = [];

  user: User;

  customerCareUsers: CustomerCare[] = [];

  selectedUser: User;

  userType = 'normalUser';

  isCuctomerCareDisabled = true;

  pagingSorting: PaginationResult = new PaginationResult();

  features: Feature[] = null;
  trackers: Tracker[] = null;

  subscribtion: Subscription;

  constructor(
    private modal: NgbModal,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private jwt: JwtHelperService
  ) { }

  ngOnInit() {
    this.fetchData();
    // this.fetchTrackers();
    // this.fetchFeatures();
  }

  fetchData() {
    this.spinner.show();
    this.userService.getUsers(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(({ paginationResult, result , meta}) => {

        this.users = result;
        this.tempUsers = result;
        this.pagingSorting.totalPages = meta.totalPages;
      },
        error => {
        });
  }

  // fetchTrackers() {
  //   this.userService.getTrackers()
  //     .subscribe(
  //       data => {
  //         this.trackers = data.result;
  //       },
  //       err => {
  //         this.trackers = [];
  //       }
  //     );
  // }

  // fetchFeatures() {
  //   this.userService.getFeatures()
  //     .subscribe(
  //       data => {
  //         this.features = data.result;
  //       },
  //       err => {
  //         this.features = [];
  //       }
  //     );
  // }

  showUserPopup(mode: string): void {
    // if (!this.trackers) {
    //   return;
    // }
    const user: User = mode === 'edit' ? this.selectedUser : new User();
    const modal: NgbModalRef = this.modal.open(UserManagementFormPopupComponent, { size: 'lg' });

    modal.componentInstance.mode = mode;
    modal.componentInstance.user = user;
    // modal.componentInstance.trackers = this.trackers;
    // modal.componentInstance.features = this.features;

    modal.result.then(
      data => {
        this.spinner.show();
        if (mode === 'add') {
          const sub = this.userService.addUser(data)
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                if (res.code === 201) {
                  this.toastr.popSucces('User created');
                  this.users.unshift(res.result);
                }
                sub.unsubscribe();
              },
              err => {
                this.toastr.popError('Error creating user');
                sub.unsubscribe();
              }
            );
        } else {
          const idx = this.users.indexOf(this.selectedUser);
          const sub = this.userService.updateUser(data, this.selectedUser['userId'])
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                if (res.code === 201 || res.code === 200) {
                  this.users[idx] = res.result;
                  this.toastr.popSucces('User details modified');
                  this.selectedUser = null;
                  sub.unsubscribe();
                }
              },
              err => {
                this.toastr.popError('Error modifying user details.');
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
        const idx = this.users.indexOf(this.selectedUser);
        const sub = this.userService.deleteUser(this.selectedUser.userId)
        .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.users[idx] = res.result;
                this.toastr.popSucces('User removed.');
                this.users.splice(idx, 1);
                this.selectedUser = null;
                sub.unsubscribe();
              }
            },
            err => {
              this.toastr.popError('Error removing the user.');
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


  showUsers() {

    if (this.userType === 'normalUser') {
      this.fetchData();
    } else {
      this.showCustomerCareUsers();
    }

  }


  showCustomerCareUsers() {
    this.spinner.show();
    this.userService.getCustomerCareUsers(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(({ paginationResult, result}) => {
        this.customerCareUsers = result;
        this.users = [];

        this.customerCareUsers.forEach(customerCare => {
          this.user = customerCare.customerCareUserDto;
          this.users.push(this.user);
        });

        this.pagingSorting.totalPages = paginationResult.totalPages;

      },
        error => {
        });

  }


  openTrackerAssignPopUp(user: User) {
    const modal: NgbModalRef = this.modal.open(AssignTrackerDistributorComponent, { size: 'lg' });
    modal.componentInstance.user = user;

    modal.result.then(
      data => {
        this.spinner.show();
          const sub = this.userService.assignTrackerToDistributor(data, user.userId)
            .finally(() => this.spinner.hide())
            .subscribe(
              res => {
                if (res.code === 201) {
                  this.toastr.popSucces('Tracker Assigned To Distributor');
                }
                sub.unsubscribe();
              },
              err => {
                this.toastr.popError('Error assigning tracker');
                sub.unsubscribe();
              }
            );
        }
    );

  }

  //backend search
  // onSearch(keyword) {
  //   keyword = keyword.trim();
  //   this.spinner.show();
  //   if (keyword === '') {
  //     this.fetchData();
  //   } else {
  //     this.userService.searchUser(keyword)
  //       .subscribe(
  //         data => {
  //           this.users = data.result;
  //           this.spinner.hide();
  //         },
  //         error => {
  //           this.spinner.hide();
  //         }
  //     );
  //   }
  // }


  //frontend search 
  onSearch(keyword) {
    keyword = keyword.trim();
    if(keyword == '' && keyword == null) {
      this.users = this.tempUsers;
    }else{
      this.users = this.tempUsers.filter(function(user) {
        return (
          user.username.indexOf(keyword) >= 0 ||
          user.userOrganizationName.indexOf(keyword) >= 0 
        );
      }); 
    }
  }
}
