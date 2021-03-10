import { Component, OnInit, Input } from '@angular/core';
import { ExpenseReport } from '@shared/models/expenseReport.model';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { ReportServiceService } from '../service/report-service.service';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { UserDetailService } from '@shared/services/user-detail.service';
import { User } from '@shared/models/user.model';
import { ExportToExcelService } from '../../services/export-to-excel.service';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
@Component({
  selector: 'p2s-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit {

  user: User;
  username='';
  isdataFetched= false;
  expenseReportList: any[] = [];
  totalExpense : number;
  trackerId: string;
  fromDate: Date;
  toDate: Date;
  expenseType: '';
  todayDate;
  trackerName ='';


  date = '';
  type = '';
  amount = '';
  
  customiseObjectForReport : any = {
    Date : this.date,
    Type : this.type,
    Amount : this.amount,
  }

  customizedExpenseReportList : any[] = [];
  

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportServiceService,
    private spinner: NgxSpinnerService,
    private userDetailService: UserDetailService,
    private excelService: ExportToExcelService
  ) { }

  ngOnInit() {
    this.todayDate = new Date();
    this.route.params
    .subscribe(param => {
      this.trackerId=param['id'];
      this.fromDate=param['fromDate'];
      this.toDate=param['toDate'];
      this.expenseType=param['expenseType'];
      this.trackerName =param['trackerName'];
    })
    this.fetchExpenseReport(this.trackerId,this.expenseType,this.fromDate,this.toDate);
    this.fetchLoggedInUser();
  }

  prints(){
    (window as any).print();
  }

  fetchExpenseReport(trackerId,expenseType,fromDate,toDate){
    this.reportService.expenseReport(trackerId,expenseType,fromDate,toDate)
      .subscribe(
          data => {
            this.expenseReportList = data.result;
            this.totalExpense = data.meta;
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

    this.expenseReportList.forEach(expense => {
      var tempExpense = [
        new Date(expense.expenseDate).toLocaleDateString(),
        expense.expenseType,
        expense.expenseAmount
      ];

      rows.push(tempExpense);
    })

    doc.setFontSize(12);

    //first and second are the x,y coordinates of the text to be positioned fron left corner
    doc.text(15, 10, 'Expense Report');
    doc.text(75, 10, `Tracker : ${this.trackerName}`);

    doc.autoTable({
      head: [['Date','Type','Amount']],
      body: rows,
      // columnStyles: {
      //   0: {columnWidth: 20},
      //   1: {columnWidth: 60},
      //   2: {columnWidth: 25},
      // },
      //   3: {columnWidth: 25},
      //   4: {columnWidth: 25},
      //   5: {columnWidth: 25}
      // },

      // customize table header and rows format
      theme: 'grid'
    });
    
    doc.save('expenseReport.pdf')
  }

  customizeDataForReport() {
    this.expenseReportList.forEach(expense => {
      this.customiseObjectForReport = {};
      this.customiseObjectForReport.Date = new Date(expense.expenseDate).toLocaleDateString(),
      this.customiseObjectForReport.Type = expense.expenseType;
      this.customiseObjectForReport.Amount = expense.expenseAmount;

      this.customizedExpenseReportList.push(this.customiseObjectForReport);
    });
    this.customizedExpenseReportList.push({Date:'',Type:'Total',Amount:this.totalExpense})
    return this.customizedExpenseReportList;
  }


  excelList : any[];

  exportAsXLSX() {
    
    this.excelList = this.customizeDataForReport();
    this.excelService.exportAsExcelFile(this.excelList, 'expenseReport');
  }
}
