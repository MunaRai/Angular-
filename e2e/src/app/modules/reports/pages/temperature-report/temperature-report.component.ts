import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '@shared/services/user-detail.service';
import { User } from '@shared/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'p2s-temperature-report',
  templateUrl: './temperature-report.component.html',
  styleUrls: ['./temperature-report.component.scss']
})
export class TemperatureReportComponent implements OnInit {

  user:User;

  trackerId: string;
  fromDate: Date;
  toDate: Date;
  speed: number;
  todayDate;
  trackerName ='';


  //dummy dates for report
  firstDate: any;
  secondDate:any;
  thirdDate: any;
  fourthDate: any;
  fifthDate: any;
  sixthDate:any;

  seventhDate: any;
  eighthDate: any;

  lastDate: any

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

    this.lastDate = this.toDate;

    this.secondDate = new Date(this.firstDate*1+ (30 * 60 * 1000));// 2 mins later

    this.thirdDate = new Date(this.secondDate*1+ (30 * 60 * 1000)); //1 hr later

    this.fourthDate = new Date(this.thirdDate*1+ (30 * 60 * 1000)); //5 min later

    this.fifthDate = new Date(this.fourthDate*1+ (30 * 60 * 1000)); // 7 hr later

    this.sixthDate = new Date(this.fifthDate*1+ (30 * 60 * 1000));  //10 mins later

    this.seventhDate = new Date(this.lastDate*1-(60 * 60 * 1000)); //2 hr and more later

    this.eighthDate = new Date(this.seventhDate*1+(30 * 60 * 1000)); // 20 mins later

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
