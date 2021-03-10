import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NgxSpinnerService {
    /**
     * Spinner observable
     *
     * @memberof NgxSpinnerService
     */
    public spinnerObservable = new BehaviorSubject<boolean>(false);
    /**
     * Creates an instance of NgxSpinnerService.
     * @memberof NgxSpinnerService
     */
    constructor() { }

    /**
     * To show spinner
     *
     * @memberof NgxSpinnerService
     */
    show() {
        this.spinnerObservable.next(true);
    }

    /**
     * To hide spinner
     *
     * @memberof NgxSpinnerService
     */
    hide() {
        this.spinnerObservable.next(false);
    }

    getStatus() {
        return this.spinnerObservable.asObservable();
    }
}
