import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { LicenseLogsService } from '../../services/license-logs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewTrackerImeiComponent } from '../view-tracker-imei/view-tracker-imei.component';
import { User } from '@shared/models/user.model';
import { UserDetailService } from '@shared/services/user-detail.service';

@Component({
  selector: 'p2s-license-logs',
  templateUrl: './license-logs.component.html',
  styleUrls: ['./license-logs.component.scss']
})
export class LicenseLogsComponent implements OnInit {

  user: User = new User();

  licenseLogs: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private modal: NgbModal,
    private licenseLogsService: LicenseLogsService,
    private userDetailService: UserDetailService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.licenseLogsService.getAllLicenseLogs()
      .finally(() => this.spinner.hide())
      .subscribe(
        data => {
          this.licenseLogs = data.result;
        },
        error => {
          console.error('Error while fetching license logs', error);
        }
      );

  }

  viewTrackerImeiNumber(licenseLog) {
    const modal: NgbModalRef = this.modal.open(ViewTrackerImeiComponent, { size: 'sm' });
    modal.componentInstance.licenseLog = licenseLog;
  }

  getCurrentUser() {
    this.userDetailService.fetchUser()
      .subscribe(
        data => {
          this.user = data.result;
        },
        error => {
          console.error('Error while fetching logged in user', error);
        }
      );
  }

}
