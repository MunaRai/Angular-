import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'p2s-save-cancel-btn',
  templateUrl: './save-cancel-btn.component.html',
  styleUrls: ['./save-cancel-btn.component.scss']
})
export class SaveCancelBtnComponent implements OnInit {

  @Output()
  save: EventEmitter<void> = new EventEmitter();


  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

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
