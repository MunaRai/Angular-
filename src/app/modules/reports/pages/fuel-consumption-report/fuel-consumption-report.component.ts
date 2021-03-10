import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailService } from '@shared/services/user-detail.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'p2s-fuel-consumption-report',
  templateUrl: './fuel-consumption-report.component.html',
  styleUrls: ['./fuel-consumption-report.component.scss']
})
export class FuelConsumptionReportComponent implements OnInit {

  user: User;

  trackerId: string;
  fromDate: Date;
  toDate: Date;
  speed: number;
  todayDate;

  //dummy data for testing
  firstDate: any;
  secondDate:any;
  thirdDate: any;
  lastDate: any;

  trackerName ='';

  barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartLabels:string[] = ['8-9 AM', '9-10 AM', '10-11 AM', '11-12AM', '12-1 PM', '1-2 PM', '2-3PM','3-4 PM', '4-5 PM', '5-6PM'];
  barChartType:string = 'bar';
  barChartLegend:boolean = true;
 
  barChartData:any[] = [{data: [5,4,3,2,8,7,5,3,2,2], label: 'fuel'}
  ];

  colors=[{backgroundColor:"#D18615", borderColor:"#000000",
  }]

  constructor(
    private route:ActivatedRoute,
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

      //dummy data for testing

    this.firstDate = this.fromDate;

    this.lastDate = this.toDate;

    this.secondDate = new Date(this.firstDate*1+ (1440 * 60 * 1000));

    this.thirdDate = new Date(this.secondDate*1+ (1440 * 60 * 1000)); 


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
