import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'p2s-wizard-footer',
  templateUrl: './wizard-footer.component.html',
  styleUrls: ['./wizard-footer.component.scss']
})
export class WizardFooterComponent implements OnInit {

  @Input()
  nextDisabled = false;

  @Input()
  prevDisabled = false;

  @Input()
  finishDisabled = false;

  @Input()
  nextHidden = false;

  @Input()
  prevHidden = false;

  @Input()
  finishHidden = false;

  @Output()
  prev: EventEmitter<void> = new EventEmitter();

  @Output()
  next: EventEmitter<void> = new EventEmitter();

  @Output()
  finish: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onPrev() {
    this.prev.emit();
  }

  onNext() {
    this.next.emit();
  }

  onFinish() {
    this.finish.emit();
  }

}
