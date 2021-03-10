import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailService } from '@shared/services/user-detail.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'p2s-trip-report',
  templateUrl: './trip-report.component.html',
  styleUrls: ['./trip-report.component.scss']
})
export class TripReportComponent implements OnInit {

  user:User;
  
  trackerId: string;
  fromDate: Date;
  toDate: Date;
  todayDate;

  trackerName ='';

  firstDate: any;
  secondDate:any;
  thirdDate: any;
  fourthDate: any;
  

  constructor(
    private route: ActivatedRoute,
    private userDetailService: UserDetailService
  ) { }

  ngOnInit() {
    this.todayDate = new Date();

    this.route.params
    .subscribe(param => {
      this.trackerId=param['id'];
      this.fromDate=param['fromDate'];
      this.toDate= param['toDate'];
      this.trackerName =param['trackerName'];

    });

    this.fetchLoggedInUser();

    this.firstDate = this.fromDate;
    this.secondDate = new Date(this.firstDate*1+ (30 * 60 * 1000));// 2 mins later
    this.thirdDate = new Date(this.secondDate*1+ (60 * 60 * 1000)); //1 hr later
    this.fourthDate = new Date(this.thirdDate*1+ (300 * 60 * 1000)); //5 min later

  }

  fetchLoggedInUser() {
    this.userDetailService.getUser()
      .subscribe(
        user => {
          this.user = user;
        }
      );
  }

  prints(){
    (window as any).print();
  }

}
