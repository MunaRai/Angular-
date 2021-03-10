import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'p2s-user-form-popup',
  templateUrl: './user-form-popup.component.html',
  styleUrls: ['./user-form-popup.component.scss']
})
export class UserFormPopupComponent implements OnInit {

  @Input()
  title = '';

  @Output()
  save: EventEmitter<void> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  @Input()
  disableSave = false;

  @Input()
  enableSave = true;

  @Input()
  enableCancel = true;

  @Input()
  enableFooter = true;

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    this.save.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

}
