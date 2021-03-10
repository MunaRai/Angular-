import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Tracker } from '@shared/models/tracker.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GeneratePopupComponent } from '../../shared/components/generate-popup/generate-popup.component';
import { SchedulePopupComponent } from '../../shared/components/schedule-popup/schedule-popup.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Expense } from '@shared/models/expense.model';
import { ReportServiceService } from '../service/report-service.service';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from '@shared/models/report.model';

@Component({
  selector: 'p2s-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  @Input()
  report: Report = new Report();

  @Input()
  data: Expense[] = [];

  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  reportDescription: any[] = [
    // tslint:disable-next-line:max-line-length
    { id: 'quick', name: 'Consolidated Report', description: 'Quick Overview report containing all the essential parameters of travelling' },
    { id: 'overSpeed', name: 'Overspeeding Analysis Report', description: 'Reports all the speed violations done by the tracker' },
    { id: 'expense', name: 'Expense Report', description: ' Expense of the tracker ' },
    // tslint:disable-next-line:max-line-length
    { id: 'trip', name: 'Trip Movement Report', description: 'Computes various trips done by the tracker and reports with complete statistics' },
    { id: 'halt', name: 'Stop Over Report', description: 'Reports all the places and the durations where vehicle was stopped' },
    // { id :'journeyVehicle', name:'Journey Report(Vehicle)',description:'Reports all the journeys based on Odometer'},
    // { id:'skippedRoute', name:'Route Skip Report',description:'Reports the list of skipped stops basen on specific route'},
    { id: 'fuel', name: 'Fuel Consumption Report', description: 'Computes fuel consumption report for a tracker' },
    // tslint:disable-next-line:max-line-length
    { id: 'fleet', name: 'Complete Fleet Report - Current Status Report', description: 'Generates report with all the positions and status of your current fleet' },
    { id: 'temp', name: 'Temperature Report', description: 'Reports the temperature value in the specified time period' },
  ];

  reportTypes: any[] = [];

  trackers: Tracker[] = [];

  selectedTracker: Tracker;

  reportForm: FormGroup;

  showCustomControls = false;

  timeAndSec: Date;

  today = new Date();

  selectedTrackerId = '';

  selectedRow = '';

  reportType = '';

  currentDate = '';

  currentTime = '';

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private reportService: ReportServiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // get current date and time to show default value in report
    // tslint:disable-next-line:max-line-length
    this.currentDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);
    this.currentTime = this.today.getHours() + ':' + ('0' + (this.today.getMinutes() + 1)).slice(-2);
    // this.today.getHours()+':'+('0' + (this.today.getMinutes() + 1)).slice(-2)+ '-' + ('0' + this.today.getSeconds()).slice(-2);


    this.buildForm();
    this.reportForm.controls['duration'].valueChanges
      .subscribe(current => {
        this.showCustomControls = current === 'custom';
      });

  }

  buildForm() {
    this.reportForm = this.fb.group({
      duration: 'Last seven days',
      format: 'html',
      metric: 'Kilometers',
      fromDate: this.currentDate,
      toDate: this.currentDate,
      speedLimit: this.report.speedLimit,
      expenseType: this.report.expenseType,
      fromTime: this.currentTime,
      toTime: this.currentTime,
    });
  }

  onTrackerSelect(tracker) {
    this.selectedTracker = Object.assign({}, tracker);
  }

  save() {

  }

  cancel() {

  }

  customDate() {

  }

  // showGeneratePopup(type?) {
  //   if(type=='expense'){
  //   const modal: NgbModalRef = this.modal.open(GeneratePopupComponent, { size: 'lg' });
  //   modal.componentInstance.type = type;
  //   modal.result.then(
  //     data => {
  //       this.spinner.show();
  //       const sub = this.reportService.expense(this.selectedTracker.trackerId, data)
  //       .finally(() => this.spinner.hide())
  //       .subscribe(
  //           res => {
  //             if(res === 201 || res === 200){
  //             this.toastr.popSucces(' Expense report generated.');
  //             this.data.push(res.result);
  //             //this.router.navigate(['../expense-report',],{relativeTo:this.route});
  //             }
  //             sub.unsubscribe();
  //           },
  //           err => {

  //             //window.open('http://localhost:4200/dashboard/reports');
  //             //this.router.navigate(['../expense-report'],{relativeTo:this.route});
  //             this.toastr.popError('Error while generating report.')
  //             sub.unsubscribe();
  //           }
  //       );
  //     }
  //   )
  // }

  // }

  showSchedulePoup(type?) {
    const modal: NgbModalRef = this.modal.open(SchedulePopupComponent, { size: 'lg' });
  }
  custom() {

  }

  dates() {
  }

  selectedReport() {
  }

  // this function sets the name of report in reportType field when report type is selected
  selectReportType(reportType) {
    this.reportType = reportType;
  }

  // this function first converts from date and to date into millisec to be send to backend,
  // and directs the report into new window if required fields are not null else pop error
  onGenerate() {
    if (this.reportType =='' || (this.reportForm.getRawValue().fromDate ==this.reportForm.getRawValue().toDate&&(this.reportForm.getRawValue().fromTime==this.reportForm.getRawValue().toTime))) {
      this.toastr.popError('Report Type,Start date,End date must be selected');
    } else {
      const fromDate = (new Date(this.reportForm.getRawValue().fromDate + 'T' + this.reportForm.getRawValue().fromTime));
      const fromDateTimeInMilliseconds = fromDate.getTime();

      const toDate = (new Date(this.reportForm.getRawValue().toDate + 'T' + this.reportForm.getRawValue().toTime));
      const toDateTimeInMilliseconds = toDate.getTime();

      if (this.reportType === 'quick') {
        window.open(
          document.location.href +
          '/quick-overview/' +
          this.selectedTracker.trackerId +
          '/' + fromDateTimeInMilliseconds +
          '/' + toDateTimeInMilliseconds
        );
      } else if (this.reportType === 'overSpeed') {
        const speedLimit = this.reportForm.getRawValue().speedLimit;
        window.open(
          document.location.href +
          '/over-speed/' +
          this.selectedTracker.trackerId + '/' +
          this.selectedTracker.trackerName + '/' +
          fromDateTimeInMilliseconds + '/' +
          toDateTimeInMilliseconds + '/' +
          speedLimit);
      } else if (this.reportType === 'expense') {
        const expenseType = this.reportForm.getRawValue().expenseType;
        // tslint:disable-next-line:max-line-length
        window.open(document.location.href + '/expense-report/' + this.selectedTracker.trackerId + '/' + this.selectedTracker.trackerName + '/' + expenseType + '/' + fromDateTimeInMilliseconds + '/' + toDateTimeInMilliseconds);
      }
      
      // else if (this.reportType === 'halt') {
      //   // tslint:disable-next-line:max-line-length
      //   window.open(document.location.href + '/halt-report/' + this.selectedTracker.trackerId + '/' + this.selectedTracker.trackerName + '/' + fromDateTimeInMilliseconds + '/' + toDateTimeInMilliseconds);
      // } else if (this.reportType === 'fleet') {
      //   // tslint:disable-next-line:max-line-length
      //   window.open(document.location.href + '/fleet-report/' + this.selectedTracker.trackerId + '/' + this.selectedTracker.trackerName + '/' + fromDateTimeInMilliseconds + '/' + toDateTimeInMilliseconds);
      // } else if (this.reportType === 'fuel') {
      //   // tslint:disable-next-line:max-line-length
      //   window.open(document.location.href + '/fuel/' + this.selectedTracker.trackerId + '/' + this.selectedTracker.trackerName + '/' + fromDateTimeInMilliseconds + '/' + toDateTimeInMilliseconds);
      // } else if (this.reportType === 'temp') {
      //   // tslint:disable-next-line:max-line-length
      //   window.open(document.location.href + '/temp/' + this.selectedTracker.trackerId + '/' + this.selectedTracker.trackerName + '/' + fromDateTimeInMilliseconds + '/' + toDateTimeInMilliseconds);
      // } else if (this.reportType === 'trip') {
      //   // tslint:disable-next-line:max-line-length
      //   window.open(document.location.href + '/trip-report/' + this.selectedTracker.trackerId + '/' + this.selectedTracker.trackerName + '/' + fromDateTimeInMilliseconds + '/' + toDateTimeInMilliseconds);
      // } else if (this.reportType === 'fleet') {
      //   // tslint:disable-next-line:max-line-length
      //   window.open(document.location.href + '/fleet-report/' + this.selectedTracker.trackerId + '/' + this.selectedTracker.trackerName + '/' + fromDateTimeInMilliseconds + '/' + toDateTimeInMilliseconds);
      // } else if (this.reportType === 'fuel') {
      //   // tslint:disable-next-line:max-line-length
      //   window.open(document.location.href + '/fuel/' + this.selectedTracker.trackerId + '/' + this.selectedTracker.trackerName + '/' + fromDateTimeInMilliseconds + '/' + toDateTimeInMilliseconds);
      // } else if (this.reportType === 'temp') {
      //   // tslint:disable-next-line:max-line-length
      //   window.open(document.location.href + '/temp/' + this.selectedTracker.trackerId + '/' + this.selectedTracker.trackerName + '/' + fromDateTimeInMilliseconds + '/' + toDateTimeInMilliseconds);
      // } else if (this.reportType === 'trip') {
      //   // tslint:disable-next-line:max-line-length
      //   window.open(document.location.href + '/trip-report/' + this.selectedTracker.trackerId + '/' + this.selectedTracker.trackerName + '/' + fromDateTimeInMilliseconds + '/' + toDateTimeInMilliseconds);
      // }
    }
  }

  onSchedule() {
    const modal: NgbModalRef = this.modal.open(SchedulePopupComponent, { size: 'lg' });

  }
}
