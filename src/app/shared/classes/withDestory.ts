import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class WithDestroy implements OnDestroy {
  destroyed$: Subject<boolean> = new Subject();

  onDestory: Function;

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    if (this.onDestory) {
      this.onDestory();
    }
  }
}

