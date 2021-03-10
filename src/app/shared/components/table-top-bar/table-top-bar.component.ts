import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'p2s-table-top-bar',
  templateUrl: './table-top-bar.component.html',
  styleUrls: ['./table-top-bar.component.scss']
})
export class TableTopBarComponent implements OnInit {

  // @Input()
  keyword :string;

  @Input()
  theme = 'primary';

  @Input()
  enablePrint = true;

  @Input()
  enableEmail = true;

  @Input()
  idProp = '';

  @Input()
  enableExport = true;

  @Input()
  enableAdminControl = false;

  @Input()
  enableView = false;

  @Input()
  viewDisabled = true;

  @Input()
  addDisabled = false;

  @Input()
  editDisabled = true;

  @Input()
  deleteDisabled = true;

  @Input()
  viewTooltip = '';

  @Input()
  addTooltip = '';

  @Input()
  editTooltip = '';

  @Input()
  deleteTooltip = '';

  @Input()
  enableAdd = true;

  @Input()
  enableDelete = true;

  @Input()
  enableEdit = true;

  @Input()
  enableSearch = true;

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  @Output()
  print: EventEmitter<void> = new EventEmitter();

  @Output()
  email: EventEmitter<void> = new EventEmitter();

  @Output()
  export: EventEmitter<void> = new EventEmitter();

  @Output()
  view: EventEmitter<void> = new EventEmitter();

  @Output()
  add: EventEmitter<void> = new EventEmitter();

  @Output()
  edit: EventEmitter<void> = new EventEmitter();

  @Output()
  delete: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onView() {
    this.view.emit();
  }

  onAdd() {
    this.add.emit();
  }

  onEdit(idProp) {
    this.edit.emit(idProp);
  }

  onDelete() {
    this.delete.emit();
  }

  onSearch() {
    this.search.emit(this.keyword);
  }



}
