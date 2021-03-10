export class PaginationResult {
  private _size: number; // number of records per page
  private _page: number; // current page
  private _sort: string; // sort field name
  private _recordsCount: number; // number of records
  private _totalPages: number; // pages count

  constructor() {
    this._size = 10;
    this._page = 1;
    this._sort = null;
  }

  set size(value) {
    this._size = value;
  }

  get size() {
    return this._size;
  }

  set page(value) {
    this._page = value;
  }

  get page() {
    return this._page;
  }

  set sort(value) {
    this._sort = value;
  }

  get sort() {
    return this._sort;
  }

  set recordsCount(value) {
    this._recordsCount = value;
  }

  get recordsCount() {
    return this._recordsCount;
  }

  set totalPages(value) {
    this._totalPages = value;
  }

  get totalPages() {
    return this._totalPages;
  }
}
