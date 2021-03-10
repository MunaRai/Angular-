import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'p2s-schedule-popup',
  templateUrl: './schedule-popup.component.html',
  styleUrls: ['./schedule-popup.component.scss']
})
export class SchedulePopupComponent implements OnInit {

  showDateControls = false;

  showMonthyControls = false;

  dateForm: FormGroup

  
  today: any = new Date();

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.dateForm.controls['method'].valueChanges
    .subscribe(current => {
      this.showDateControls = current ==='weekly';
      this.showMonthyControls = current ==='monthly';

    });
  }

  buildForm(){
    this.dateForm = this.fb.group({
      method : 'daily',
      email : '',
      day : 'sunday',
      date : ''

    })
  }

  save(){

  }

  dismiss() {
    this.modal.dismiss();
  }
}
