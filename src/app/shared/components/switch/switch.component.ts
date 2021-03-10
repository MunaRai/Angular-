import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'p2s-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ]
})
export class SwitchComponent implements OnInit, ControlValueAccessor {

  value = false;

  constructor() { }

  ngOnInit() {
  }

  propagateChange = (_: any) => { };

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched() { }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  onChange() {
    this.value = !this.value;
    this.propagateChange(this.value);
  }

}
