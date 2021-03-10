import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackerService } from '../../../tracker-management/services/tracker.service';
import { ReportServiceService } from '../service/report-service.service';
import { QuickOverview } from '@shared/models/quickOverView.model';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { UserDetailService } from '@shared/services/user-detail.service';
import { User } from '@shared/models/user.model';
import { ExportToExcelService } from '../../services/export-to-excel.service';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';

@Component({
  selector: 'p2s-quick-overview',
  templateUrl: './quick-overview.component.html',
  styleUrls: ['./quick-overview.component.scss']
})
export class QuickOverviewComponent implements OnInit {

  @Input()
  quickOverview: QuickOverview = new QuickOverview();

  quickOverviewList: QuickOverview[] = [];

  user:User;

  isdataFetched= false;

  username = '';

  trackerId: string;
  fromDate: Date;
  toDate: Date;
  todayDate;
  trackerName ='';

  constructor(
    private route: ActivatedRoute,
    private reportService:ReportServiceService,
    private spinner: NgxSpinnerService,
    private userDetailService:UserDetailService,
    private excelService: ExportToExcelService
  ) {}

  ngOnInit() {

    this.todayDate = new Date();
    this.route.params
    .subscribe(param => {
     this.trackerId=param['id'];
     this.fromDate=param['fromDate'];
     this.toDate= param['toDate'];
    })
    this.fetchLoggedInUser();

    this.fetchOverViewReport(this.trackerId,this.fromDate,this.toDate);
   
  }

  prints(){
    (window as any).print();
  }

  fetchOverViewReport(trackerId,fromDate,toDate){
    this.reportService.quickOverview(trackerId,fromDate,toDate)
      .subscribe(
        data =>{
          this.quickOverview= data.result;
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

    // rows.push(this.quickOverview);
    rows.push([
      new Date(this.todayDate).toLocaleDateString(),
      new Date(this.quickOverview.firstIgnition).toLocaleDateString(),
      this.quickOverview.firtIgnitionLocation,
      new Date(this.quickOverview.lastIgnition).toLocaleDateString(),
      this.quickOverview.lastIgnitionLocation,
      this.quickOverview.stopDuration,
      this.quickOverview.movingDuration,
      this.quickOverview.maximumSpeed,
      this.quickOverview.distance
    ]);

    doc.setFontSize(12);

    //first and second are the x,y coordinates of the text to be positioned fron left corner
    doc.text(15, 10, 'Consolidated Report');
    doc.text(75, 10, `Tracker : ${this.quickOverview.trackerName}`);
    // doc.text(150, 10, `Date : ${this.todayDate}`);

    doc.autoTable({
      head: [[
        'Date',
        'First Ignition',
        'First Ignition Location',
        'Last Ignition',
        'Last Ignition Location',
        'Stop Duration',
        'Movement Duration',
        'Max Speed',
        'Distance(km)',
      ]],

      body: rows,
      
      columnStyles: {
        0: {columnWidth: 20},
        1: {columnWidth: 20},
        2: {columnWidth: 20},
        3: {columnWidth: 20},
        4: {columnWidth: 20},
        5: {columnWidth: 20},
        6: {columnWidth: 25},
        7: {columnWidth: 20},
        8: {columnWidth: 20},
      },

      theme: 'grid'
    });
    
    doc.save('consolidateReport.pdf')
  }


  customizeDataForReport() {
    this.quickOverviewList.push(this.quickOverview);
    return this.quickOverviewList;
  }


  exportAsXLSX() {
    this.quickOverviewList = this.customizeDataForReport();
    this.excelService.exportAsExcelFile(this.quickOverviewList, 'consolidateReport');
  }

}
