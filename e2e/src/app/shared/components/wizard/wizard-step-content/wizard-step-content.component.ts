import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'p2s-wizard-step-content',
  templateUrl: './wizard-step-content.component.html',
  styleUrls: ['./wizard-step-content.component.scss']
})
export class WizardStepContentComponent implements OnInit {

  @Input()
  step: number;

  @Input()
  active = false;

  constructor() { }

  ngOnInit() {
  }

}
