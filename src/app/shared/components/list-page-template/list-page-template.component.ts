import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'p2s-list-page-template',
  templateUrl: './list-page-template.component.html',
  styleUrls: ['./list-page-template.component.scss']
})
export class ListPageTemplateComponent implements OnInit {

  @Input()
  heading: string;

  @Input()
  hideHeader = false;

  @Input()
  page = 1;

  @Input()
  limit = 10;

  @Input()
  totalPages;

  @Input()
  addDisabled = false;

  @Input()
  viewDisabled = true;

  @Input()
  editDisabled = true;

  @Input()
  deleteDisabled = true;

  @Input()
  addTooltip = '';

  @Input()
  editTooltip = '';

  @Input()
  deleteTooltip = '';

  @Input()
  enableAdd = true;

  @Input()
  enableEdit = true;

  @Input()
  enableDelete = true;

  @Input()
  enableSearch = true;

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  @Output()
  view: EventEmitter<void> = new EventEmitter();

  @Output()
  add: EventEmitter<void> = new EventEmitter();

  @Output()
  edit: EventEmitter<void> = new EventEmitter();

  @Output()
  delete: EventEmitter<void> = new EventEmitter();

  @Output()
  prev: EventEmitter<void> = new EventEmitter();

  @Output()
  next: EventEmitter<void> = new EventEmitter();

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter();

  @Output()
  limitChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearch(keyword) {
    this.search.emit(keyword);
  }

  onView() {
    this.view.emit();
  }

  onAdd() {
    this.add.emit();
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onPrev() {
    this.prev.emit();
  }

  onNext() {
    this.next.emit();
  }

  onPageChange(pageNumber) {
    this.pageChange.emit(pageNumber);
  }

  onLimitChange(limit) {
    this.limitChange.emit(limit);
  }

}
