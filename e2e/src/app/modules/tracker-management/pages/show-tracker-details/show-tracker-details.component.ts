import { Component, OnInit } from '@angular/core';
import { Tracker } from '@shared/models/tracker.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'p2s-show-tracker-details',
  templateUrl: './show-tracker-details.component.html',
  styleUrls: ['./show-tracker-details.component.scss'],
})
export class ShowTrackerDetailsComponent implements OnInit {
  tracker: Tracker;

  user: User;

  constructor(
    private modal: NgbActiveModal,
  ){}

  ngOnInit() {
  }

  onCancel() {
    this.modal.dismiss();
  }

  dismiss() {
    this.modal.dismiss();
  }


}
