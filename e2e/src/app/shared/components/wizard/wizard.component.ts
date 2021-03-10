import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, AfterViewInit, QueryList } from '@angular/core';
import { WizardEvent, WizardEventType, WizardHeaderItem } from './wizard-types';
import { WizardStepContentComponent } from './wizard-step-content/wizard-step-content.component';

@Component({
  selector: 'p2s-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterViewInit {

  @Input()
  heading = '';

  @Input()
  stepHeaders: WizardHeaderItem[] = [];

  @Input()
  activeStep = 1;

  @Output()
  change: EventEmitter<WizardEvent> = new EventEmitter();

  @Output()
  prev: EventEmitter<number> = new EventEmitter();

  @Output()
  next: EventEmitter<number> = new EventEmitter();

  @Output()
  finish: EventEmitter<boolean> = new EventEmitter();

  @ContentChildren(WizardStepContentComponent)
  wizardContetnts: QueryList<WizardStepContentComponent>;

  complete = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setActiveStep(+this.activeStep);
  }

  setActiveStep(step: number) {
    // timeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() =>
      this.wizardContetnts.map(wizardContent => {
        wizardContent.active = +wizardContent.step === step;
      }), 0);
  }

  onPrev() {
    this.change.emit({
      type: WizardEventType.prev,
      previousIndex: this.activeStep,
      nextIndex: this.activeStep - 1
    });
    this.activeStep = this.activeStep - 1;
    this.setActiveStep(this.activeStep);
    this.prev.emit(this.activeStep);
  }

  onNext() {
    this.change.emit({
      type: WizardEventType.prev,
      previousIndex: this.activeStep,
      nextIndex: this.activeStep + 1
    });
    this.activeStep = this.activeStep + 1;
    this.setActiveStep(this.activeStep);
    this.next.emit(this.activeStep);
  }

  onFinish() {
    this.change.emit({
      type: WizardEventType.prev,
      previousIndex: this.activeStep,
      nextIndex: this.activeStep + 1
    });
    this.activeStep = this.activeStep + 1;
    this.setActiveStep(this.activeStep);
    this.complete = true;
    this.finish.emit(this.complete);
  }

}
