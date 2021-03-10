import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FullScreenSpinnerService {

  $isSpinnerShowing: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
  ) { }

  show() {
    this.$isSpinnerShowing.next(true);
  }

  hide() {
    this.$isSpinnerShowing.next(false);
  }

  getStatus() {
    return this.$isSpinnerShowing.asObservable();
  }

}
