import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'p2s-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {

  @Input()
  message: string;

  @Input()
  icon = 'far fa-lightbulb';

  constructor() { }

  ngOnInit() {
  }

}
