import { Component, OnInit, HostBinding } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReminderComponent } from '@shared/components/reminder-management/pages/reminder/reminder.component';

@Component({
  selector: 'p2s-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  constructor(
    private modal: NgbModal
  ) { }

  ngOnInit() {
  }

  
  reminder(evt):void {
    const modal = this.modal.open(ReminderComponent, { size: 'lg' });
    // modal.componentInstance.mode = mode;
  }
}
