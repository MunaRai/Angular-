import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ReportServiceService } from '../service/report-service.service';
import { UserDetailService } from '@shared/services/user-detail.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'p2s-halt-report',
  templateUrl: './halt-report.component.html',
  styleUrls: ['./halt-report.component.scss']
})
export class HaltReportComponent implements OnInit {

  user:User;

  trackerId: string;
  fromDate: Date;
  toDate: Date;
  speed: number;
  todayDate;
  trackerName:''


  //dummy dates for report
  firstDate: any;
  secondDate:any;
  thirdDate: any;
  fourthDate: any;
  fifthDate: any;
  sixthDate:any;

  seventhDate: any;
  eighthDate: any;

  lastDate: any;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner:NgxSpinnerService,
    private reportService: ReportServiceService,
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

    


    //dummy dates for report

    this.firstDate = this.fromDate;

    this.lastDate = this.toDate;

    this.secondDate = new Date(this.firstDate*1+ (2 * 60 * 1000));// 2 mins later

    this.thirdDate = new Date(this.secondDate*1+ (58 * 60 * 1000)); //1 hr later

    this.fourthDate = new Date(this.thirdDate*1+ (5 * 60 * 1000)); //5 min later

    this.fifthDate = new Date(this.fourthDate*1+ (500 * 60 * 1000)); // 7 hr later

    this.sixthDate = new Date(this.fifthDate*1+ (10 * 60 * 1000));  //10 mins later

    this.seventhDate = new Date(this.lastDate*1-(10 * 60 * 1000)); //2 hr and more later

    this.eighthDate = new Date(this.seventhDate*1+(3 * 60 * 1000)); // 20 mins later


    


    
  }
  

  

  
  prints(){
    (window as any).print();
  }

  fetchLoggedInUser() {
    this.userDetailService.getUser()
      .subscribe(
        user => {
          this.user = user;
        }
      );
  }

  

}
