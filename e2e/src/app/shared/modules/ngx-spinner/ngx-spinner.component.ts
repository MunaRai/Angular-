import { Component, OnDestroy, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner/ngx-spinner.service';
import { Subscription } from 'rxjs/Subscription';
import { LOADERS } from '@shared/modules/ngx-spinner/loader.layout';

@Component({
    selector: 'ngx-spinner',
    templateUrl: 'ngx-spinner.component.html',
    styleUrls: ['ngx-spinner.component.css']
})

export class NgxSpinnerComponent implements OnDestroy, OnInit, OnChanges {

    /**
     * To set backdrop opacity(0.8)
     *
     * @memberof NgxSpinnerComponent
     */
    @Input() bdOpacity = 0.8;

    /**
     * To set backdrop color('#333')
     *
     * @memberof NgxSpinnerComponent
     */
    @Input() bdColor = '#333';

    /**
     * To set spinner size
     *
     * @memberof NgxSpinnerComponent
     */
    @Input() size = '';

    /**
     * To set spinner color('#fff')
     *
     * @memberof NgxSpinnerComponent
     */
    @Input() color = '#fff';

    /**
     * To set type of spinner
     *
     * @memberof NgxSpinnerComponent
     */
    @Input() type: string;
    /**
     * To set loading text(false)
     *
     * @memberof NgxSpinnerComponent
     */
    @Input() loadingText = false;

    /**
     * Class for spinner
     *
     * @memberof NgxSpinnerComponent
     */
    spinnerClass: string;

    /**
     * Flag to show/hide spinner
     *
     * @memberof NgxSpinnerComponent
     */
    showSpinner = false;

    /**
     * Subscription variable for spinner
     *
     * @memberof NgxSpinnerComponent
     */
    spinnerSubscription: Subscription;

    /**
     * Array for spinner divs
     *
     * @memberof NgxSpinnerComponent
     */
    divArray: Array<number> = [];

    /**
     * Counter for div
     *
     * @memberof NgxSpinnerComponent
     */
    divCount = 0;

    /**
     * Creates an instance of NgxSpinnerComponent.
     *
     * @memberof NgxSpinnerComponent
     */
    constructor(private spinnerService: NgxSpinnerService) {
        spinnerService.getStatus().subscribe(status => {
            this.showSpinner = status;
        });
    }

    /**
     * Initialization method
     *
     * @memberof NgxSpinnerComponent
     */
    ngOnInit() {
        this.onInputChange();
    }

    /**
     * On changes event for input variables
     *
     * @memberof NgxSpinnerComponent
     */
    ngOnChanges(changes: SimpleChanges) {
        const typeChange: SimpleChange = changes.type;
        const sizeChange: SimpleChange = changes.size;

        if (typeChange) {
            if (typeof typeChange.currentValue !== 'undefined' && typeChange.currentValue !== typeChange.previousValue) {
                if (typeChange.currentValue !== '') {
                    this.type = typeChange.currentValue;
                    this.onInputChange();
                }
            }
        }

        if (sizeChange) {
            if (typeof sizeChange.currentValue !== 'undefined' && sizeChange.currentValue !== sizeChange.previousValue) {
                if (sizeChange.currentValue !== '') {
                    this.size = sizeChange.currentValue;
                    this.onInputChange();
                }
            }
        }
    }

    /**
     * To get class for spinner
     *
     * @memberof NgxSpinnerComponent
     */
    getClass(type = 'ball-scale-multiple', size = 'large'): string {
        this.divCount = LOADERS[type];
        this.divArray = Array(this.divCount).fill(0).map((x, i) => i);
        let sizeClass = '';
        switch (size.toLowerCase()) {
            case 'small':
                sizeClass = 'la-sm';
                break;
            case 'medium':
                sizeClass = 'la-2x';
                break;
            case 'large':
                sizeClass = 'la-3x';
                break;
            default:
                break;
        }
        return 'la-' + type + ' ' + sizeClass;
    }

    /**
     * After input variables chnage event
     *
     * @memberof NgxSpinnerComponent
     */
    onInputChange() {
        this.spinnerClass = this.getClass(this.type, this.size);
    }

    /**
     * Component destroy event
     *
     * @memberof NgxSpinnerComponent
     */
    ngOnDestroy() {
        this.spinnerSubscription.unsubscribe();
    }
}
