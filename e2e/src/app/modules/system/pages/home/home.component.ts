import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DistributorService } from '../distributor/services/distributor.service';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { Distributor } from '@shared/system-models/distributor.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { TrackerService } from '../../../tracker-management/services/tracker.service';
import { Tracker } from '../../../home/models/tracker.model';
import { LicenseService } from '../license/services/license.service';
import { License } from '@shared/system-models/license.model';
import { User } from '@shared/models/user.model';
import { UserService } from '../../../user-management/services/user.service';

@Component({
  selector: 'p2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  distributor: Distributor = new Distributor();

  distributorCount = 0;

  trackers: Tracker = new Tracker();

  trackerCount = 0;

  licenses: License = new License();

  licenseCount = 0;

  users: User = new User();

  userCount = 0;
  
  pagingSorting: PaginationResult = new PaginationResult();

  distributors: Distributor[]=[];


  constructor(
    private distributorService: DistributorService,
    private trackerService: TrackerService,
    private licenseService: LicenseService,
    private userService: UserService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getDistributor();
    this.getTotalTrackers();
    this.getTotalLicense();
    this.getUsers();
  }

  getDistributor() {
    this.distributorService.getDistributorsDetails(this.pagingSorting)
      .subscribe(
        ({ paginationResult, result }) => {
          this.distributors = result;
          this.pagingSorting.totalPages = paginationResult.totalPages;
          this.distributorCount = paginationResult.recordsCount || 0;
        },
        
        error => {
          console.error('error fetching distributors',error);
        }
      );
  }

  getTotalTrackers(){
    this.trackerService.getTrackers(this.pagingSorting)
      .subscribe(
        ({ paginationResult, result }) => {
          this.trackers = result;
          this.trackerCount = paginationResult.recordsCount || 0;
        },
        error => {
          console.error('error',error);
        }
      );
  }

  getTotalLicense(){
    this.licenseService.getLicenseCount()
      .subscribe(
        ({ result }) => {
          this.licenseCount  = result || 0;
        },
        error => {
        }
      );
  }

  getUsers(){
    this.userService.getUsers(this.pagingSorting)
      .finally(() => this.spinner.hide())
      .subscribe(({result, meta }) => {
        this.users = result;
        this.userCount = meta.recordsCount;
      },
        error => {
        });
  }
}
