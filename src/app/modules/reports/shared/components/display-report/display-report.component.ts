import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'p2s-display-report',
  templateUrl: './display-report.component.html',
  styleUrls: ['./display-report.component.scss']
})
export class DisplayReportComponent implements OnInit {

  constructor(
    private modal : NgbActiveModal
  ) { }

  ngOnInit() {
  }

  dismiss(){
    this.modal.dismiss();
  }

}
