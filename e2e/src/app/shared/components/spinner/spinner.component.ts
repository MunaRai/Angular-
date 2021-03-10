import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'p2s-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input()
  color = 'mixed';

  @Input()
  size = 'md';

  constructor() { }

  ngOnInit() {
  }

}
