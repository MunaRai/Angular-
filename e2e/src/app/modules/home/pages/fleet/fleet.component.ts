import { Component, OnInit, HostBinding } from '@angular/core';
import { Tracker } from '@shared/models/tracker.model';
import { ReminderComponent } from '@shared/components/reminder-management/pages/reminder/reminder.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'p2s-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {

  selectedTracker: Tracker = new Tracker();


  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  constructor(
    private modal: NgbModal
  ) { }

  ngOnInit() {
  }

  onTrackerSelect(tracker) {
    this.selectedTracker = Object.assign({}, tracker);
  }

  openReminder(evt):void {
    const modal = this.modal.open(ReminderComponent, { size: 'lg' });
    // modal.componentInstance.mode = mode;
  }
}
