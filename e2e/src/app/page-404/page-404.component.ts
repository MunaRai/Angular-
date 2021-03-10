import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'p2s-page-404',
  templateUrl: './page-404.component.html',
  styleUrls: ['./page-404.component.scss']
})
export class Page404Component implements OnInit {

  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  constructor() { }

  ngOnInit() {
  }

}
