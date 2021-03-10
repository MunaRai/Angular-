import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '../../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'p2s-order-cancel-popup',
  templateUrl: './order-cancel-popup.component.html',
  styleUrls: ['./order-cancel-popup.component.scss']
})
export class OrderCancelPopupComponent implements OnInit {

  title = 'Confirm Order Cancel';

  message = 'Are you sure you want to cancel this order?';

  constructor(
    private modal: NgbActiveModal
  ) { }

  close() {
    this.modal.close();
  }

  dismiss() {
    this.modal.dismiss();
  }

  ngOnInit() {
  }

}
