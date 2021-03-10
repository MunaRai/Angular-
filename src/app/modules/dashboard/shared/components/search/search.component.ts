import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'p2s-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isSearchShowing = false;

  @HostListener('window:click')
  closeSearch() {
    this.isSearchShowing = false;
  }

  constructor() { }

  ngOnInit() {
  }

  search(evt: Event) {
    evt.stopPropagation();
    this.isSearchShowing ? this.performSearch() : this.isSearchShowing = true;
  }

  performSearch() {}

}
