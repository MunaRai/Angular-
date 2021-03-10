import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager, ToastOptions } from 'ng2-toastr';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'p2s-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  toastrOptions: ToastOptions = new ToastOptions();

  constructor(
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private toastService: ToastService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.toastrOptions.positionClass = 'toast-top-center';
  }

  ngOnInit() {
    this.toastService.getToast()
      .subscribe(({type, msg}) => {
        switch (type) {
          case 'success':
            this.toastr.success(msg, 'Success!');
            break;
          case 'error':
            this.toastr.error(msg, 'Error!', this.toastrOptions);
            break;
          case 'warning':
            this.toastr.warning(msg, 'Warning!', this.toastrOptions);
        }
    });
  }
}
