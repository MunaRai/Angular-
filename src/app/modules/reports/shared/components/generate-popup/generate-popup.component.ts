import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DisplayReportComponent } from '../display-report/display-report.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'p2s-generate-popup',
  templateUrl: './generate-popup.component.html',
  styleUrls: ['./generate-popup.component.scss']
})
export class GeneratePopupComponent implements OnInit {

  type = '';

  optionType = '';

  formSubmitted = false;

  expenseReportForm: FormGroup;

  today: any = new Date();

  constructor(
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  save(){
    this.formSubmitted = true;
    if (this.expenseReportForm.valid) {
      this.modal.close(this.expenseReportForm.getRawValue());
    }
  }

  close() {
    // this.modal.close();
  }
  
  dismiss(){
    this.modal.dismiss();
  }


 
}
