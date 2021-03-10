import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ToastService {

  toast$: BehaviorSubject<any> = new BehaviorSubject<any>({
    type: '',
    msg: ''
  });

  constructor() { }

  popSucces(msg) {
    this.toast$.next({
      type: 'success',
      msg
    });
  }

  popError(msg) {
    this.toast$.next({
      type: 'error',
      msg
    });
  }

  popWarning(msg) {
    this.toast$.next({
      type: 'warning',
      msg
    });
  }

  getToast() {
    return this.toast$.asObservable();
  }

}
