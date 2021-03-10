import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'p2s-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.scss']
})
export class ListSelectorComponent implements OnInit {

  @Input()
  label = 'Select Items';

  @Input()
  collection: any[] = [];

  @Input()
  selection: string[] = [];

  @Input()
  idProp = 'trackerId';

  @Input()
  nameProp = 'trackerName';

  @Input()
  codeProp = 'trackerCode';

  // @Input()
  // assignedCollection: any[] = [];

  @Output()
  change: EventEmitter<string[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  add(item) {
    this.selection.push(item[this.idProp]);
    this.collection = [...this.collection];
    this.onChange();
  }

  remove(index) {
    this.selection.splice(index, 1);
    this.collection = [...this.collection];
    this.onChange();
  }

  onChange() {
    this.change.emit(this.selection);
  }

}
