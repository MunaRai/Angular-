import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
  selector: 'p2s-delete-confirmation-popup',
  templateUrl: './delete-confirmation-popup.component.html',
  styleUrls: ['./delete-confirmation-popup.component.scss']
})
export class DeleteConfirmationPopupComponent implements OnInit {

  title = 'Confirm Delete';

  message = 'Are you sure you want to remove this record?';

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
