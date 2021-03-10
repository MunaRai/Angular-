import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'p2s-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  @Input()
  checked: boolean;

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

  @Output()
  change: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  propagateChange = (_: any) => { };

  writeValue(value: any = false) {
    this.checked = value;
  }

  registerOnTouched() { }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  onChange(evt) {
    this.checked = evt.target.checked;
    this.propagateChange(this.checked);
  }

}
