import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { LockedIpService } from '../../services/locked-ip.service';

@Component({
  selector: 'p2s-locked-ip',
  templateUrl: './locked-ip.component.html',
  styleUrls: ['./locked-ip.component.scss']
})
export class LockedIpComponent implements OnInit {

  lockedIps = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private lockedIpService: LockedIpService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.lockedIpService.getAllLockedIps()
    .finally(() => this.spinner.hide())
      .subscribe(
        ({ result }) => {
          this.lockedIps = result;
        },
        error => {
        }
      );
  }

  unLockIpAddress(ipAddress) {
    this.lockedIpService.unLockIpAddress(ipAddress)
    .finally(() => this.spinner.hide())
      .subscribe(
        ({ result }) => {
          this.toastr.popSucces('IP Adress is Unlocked Succesfully');
        },
        error => {
          this.toastr.popError('Error in unlocking')
        }
      );
  }


}
