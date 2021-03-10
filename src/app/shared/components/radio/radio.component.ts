import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'p2s-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  selected: string;

  @Input()
  value: string;

  @Input()
  id: string;

  @Input()
  label: string;

  @Input()
  name: string;

  @Input()
  inline = false;

  @Input()
  disabled = false;

  constructor() { }

  ngOnInit() {
  }

  propagateChange = (_: any) => { };

  writeValue(value: any = false) {
    this.selected = value;
  }

  registerOnTouched() { }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  onChange() {
    this.propagateChange(this.selected);
  }

}
