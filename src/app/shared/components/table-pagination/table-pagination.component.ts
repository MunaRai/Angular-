import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'p2s-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {

  @Input()
  theme = 'primary';

  @Input()
  size = 'lg';

  @Input()
  page = 1;

  @Input()
  totalPages;

  @Input()
  limit = 10;

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

  onPageChange() {
    this.pageChange.emit(this.page);
  }

  onLimitChange() {
    this.limitChange.emit(this.limit);
  }

  onPrev() {
    this.page--;
    if (this.page === 0) {
      this.page = 1;
    } else {
      this.prev.emit();
    }
  }

  onNext() {
    this.page++;
    if (this.page > this.totalPages) {
      this.page = this.totalPages;
    } else {
      this.next.emit();
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    const totalPagesCharCode = this.totalPages.toString().charCodeAt(0);
    
    if (charCode > 31 && (charCode < 49 || charCode > 57 || charCode > totalPagesCharCode)) {
      return false;
    }
    return true;

  }

}
