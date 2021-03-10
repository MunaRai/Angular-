import { Component, Input } from '@angular/core';

@Component({
  selector: 'p2s-no-record',
  templateUrl: './no-record.component.html',
  styleUrls: ['./no-record.component.scss']
})
export class NoRecordComponent {
  @Input()
  message = 'No record found.';
}
