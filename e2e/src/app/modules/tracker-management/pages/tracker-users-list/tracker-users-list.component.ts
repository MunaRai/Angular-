import { Component, OnInit } from '@angular/core';
import { Tracker } from '@shared/models/tracker.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'p2s-tracker-users-list',
  templateUrl: './tracker-users-list.component.html',
  styleUrls: ['./tracker-users-list.component.scss']
})
export class TrackerUsersListComponent implements OnInit {

  tracker: Tracker;

  constructor(
    private modal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this.modal.dismiss();
  }

}
