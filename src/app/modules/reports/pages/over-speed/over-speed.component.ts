import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ReportServiceService } from '../service/report-service.service';
import { OverSpeed } from '@shared/models/over-speed.model';
import { UserDetailService } from '@shared/services/user-detail.service';
import { User } from '@shared/models/user.model';

//generating pdf
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import { ExportToExcelService } from '../../services/export-to-excel.service';

@Component({
  selector: 'p2s-over-speed',
  templateUrl: './over-speed.component.html',
  styleUrls: ['./over-speed.component.scss']
})
export class OverSpeedComponent implements OnInit {

  @Input()
  overSpeedList:OverSpeed[]=[];

  user:User
  isdataFetched = false;
  username='';
  date = '';
  address = '';
  lat = '';
  lon = '';
  distance = '';
  trackerSpeed = '';


customiseObjectForReport : any = {
  Date : this.date,
  Address : this.address,
  Lat : this.lat,
  Lng : this.lon,
  Distance : this.distance,
  Speed : this.trackerSpeed
};



  customizedOverSpeedList : any[] = [];

  trackerId: string;
  fromDate: Date;
  toDate: Date;
  speed: number;
  todayDate;
  trackerName='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner:NgxSpinnerService,
    private reportService: ReportServiceService,
    private userDetailService: UserDetailService,
    private excelService: ExportToExcelService
  ) { }

  ngOnInit() {
    this.todayDate = new Date();
    
    this.route.params
      .subscribe(param => {
        this.trackerId=param['id'];
        this.fromDate=param['fromDate'];
        this.toDate= param['toDate'];
        this.speed= param['speed'];
        this.trackerName =param['trackerName'];
      });
    this.fetchOverSpeedReport(this.trackerId,this.fromDate,this.toDate,this.speed);
    this.fetchLoggedInUser();
  }


  prints(){
    (window as any).print();
  }

  fetchOverSpeedReport(trackerId,fromDate,toDate,speed){
    this.reportService.overSpeed(trackerId,fromDate,toDate,speed)
      .subscribe(
        data =>{
          this.overSpeedList= data.result;
          this.isdataFetched = true;
      },
      error =>{
      }
    )
  }

  fetchLoggedInUser() {
    this.userDetailService.getUser()
      .subscribe(
        user => {
          const currentUser ={...this.user,...user}
          this.username = currentUser.username;
        }
      );
  }



  generatePdf() {
    var doc = new jsPDF();
    var rows = [];

    this.overSpeedList.forEach(overSpeedData => {
      var tempSpeed = [
        new Date(overSpeedData.gpsAttributeDateCreated).toLocaleDateString(),
        overSpeedData.gpsAttributeAddress,
        overSpeedData.gpsAttributeLat,
        overSpeedData.gpsAttributeLng,
        overSpeedData.gpsAttributeDistance,
        overSpeedData.gpsAttributeSpeed
      ];
      rows.push(tempSpeed);
    })

    doc.setFontSize(12);

    //first and second are the x,y coordinates of the text to be positioned fron left corner
    doc.text(15, 10, 'Over Speed Report');
    doc.text(75, 10, `Tracker : ${this.trackerName}`);
    doc.text(150, 10, `Speed : ${this.speed}`);

    doc.autoTable({
      head: [['Date','Address','Lat','Lon','Distance(km)','Speed(km/hr)']],
      body: rows,
      columnStyles: {
        0: {columnWidth: 20},
        1: {columnWidth: 60},
        2: {columnWidth: 25},
        3: {columnWidth: 25},
        4: {columnWidth: 25},
        5: {columnWidth: 25}
      },

      // customize table header and rows format
      theme: 'grid'
    });
    
    doc.save('overSpeedReport.pdf')
  }


  excelList : any[];

  exportAsXLSX():void {
    // rows : OverSpeed[];
    this.excelList = this.customizeDataForReport();

    // this.overSpeedList.forEach(overSpeedData => {
    //   var tempSpeed = [
    //     new Date(overSpeedData.gpsAttributeDateCreated).toLocaleDateString(),
    //     overSpeedData.gpsAttributeAddress,
    //     overSpeedData.gpsAttributeLat,
    //     overSpeedData.gpsAttributeLng,
    //     overSpeedData.gpsAttributeDistance,
    //     overSpeedData.gpsAttributeSpeed
    //   ];
    //   rows.push(tempSpeed);
    // })

    this.excelService.exportAsExcelFile(this.excelList, 'overSpeedReport');
  }



  customizeDataForReport() {
    this.overSpeedList.forEach(overSpeedData => {
      this.customiseObjectForReport = {};
      this.customiseObjectForReport.Date= new Date(overSpeedData.gpsAttributeDateCreated).toLocaleDateString(),
      this.customiseObjectForReport.Address = overSpeedData.gpsAttributeAddress;
      this.customiseObjectForReport.Lat = overSpeedData.gpsAttributeLat;
      this.customiseObjectForReport.Lng = overSpeedData.gpsAttributeLng;
      this.customiseObjectForReport.Distance = overSpeedData.gpsAttributeDistance;
      this.customiseObjectForReport.Speed = overSpeedData.gpsAttributeSpeed;

      // let customizeOverSpeedData : OverSpeed =  new OverSpeed();
      // customizeOverSpeedData.gpsAttributeDateCreated = overSpeedData.gpsAttributeDateCreated;
      // customizeOverSpeedData.gpsAttributeAddress = overSpeedData.gpsAttributeAddress;
      // customizeOverSpeedData.gpsAttributeLat = overSpeedData.gpsAttributeLat;
      // customizeOverSpeedData.gpsAttributeLng = overSpeedData.gpsAttributeLng;
      // customizeOverSpeedData.gpsAttributeDistance = overSpeedData.gpsAttributeDistance;
      // customizeOverSpeedData.gpsAttributeSpeed = overSpeedData.gpsAttributeSpeed;

      this.customizedOverSpeedList.push(this.customiseObjectForReport);
    });

    return this.customizedOverSpeedList;
  }
}
