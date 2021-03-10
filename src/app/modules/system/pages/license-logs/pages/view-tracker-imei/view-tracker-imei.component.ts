import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'p2s-view-tracker-imei',
  templateUrl: './view-tracker-imei.component.html',
  styleUrls: ['./view-tracker-imei.component.scss']
})
export class ViewTrackerImeiComponent implements OnInit {

  licenseLog: any;

  constructor(
    private modal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this.modal.dismiss();
  }

}
