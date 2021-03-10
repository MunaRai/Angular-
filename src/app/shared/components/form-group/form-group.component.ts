import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'p2s-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {

  @Input()
  label = '';

  @Input()
  for = '';

  @Input()
  required = false;

  constructor() { }

  ngOnInit() {
  }

}
