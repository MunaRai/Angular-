import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'p2s-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.scss']
})
export class WizardStepComponent implements OnInit {

  @Input()
  step: number;

  @Input()
  active = false;

  @Input()
  heading = '';

  @Input()
  subheading = '';

  @Input()
  icon = '';

  @Input()
  lastStep = false;

  @Input()
  firstStep = false;

  @Input()
  success = false;

  constructor() { }

  ngOnInit() {
  }

}
