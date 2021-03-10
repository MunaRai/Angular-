import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tracker } from '@shared/models/tracker.model';

@Component({
  selector: 'p2s-geofence-assignment-popup',
  templateUrl: './geofence-assignment-popup.component.html',
  styleUrls: ['./geofence-assignment-popup.component.scss']
})
export class GeofenceAssignmentPopupComponent {

  selectedTrackers: Tracker[] = [];

  trackers: Tracker[] = [];

  constructor(
    private modal: NgbActiveModal,
  ) { }

  close() {
    this.modal.close(this.selectedTrackers);
  }

  dismiss() {
    this.modal.dismiss();
  }

  toggleTrackerSelection(tracker, isSelected) {
    if (isSelected) {
      this.selectedTrackers.push(tracker);
    } else {
      this.selectedTrackers = this.selectedTrackers.filter(selected => tracker !== selected);
    }
  }

}
