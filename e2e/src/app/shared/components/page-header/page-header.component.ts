import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'p2s-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input()
  heading = 'title';

  @Input()
  size: 'lg' | 'md'| 'sm' = 'lg';

  constructor() { }

  ngOnInit() {
  }

}
