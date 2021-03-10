import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerComponent } from '@shared/modules/ngx-spinner/ngx-spinner.component';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner/ngx-spinner.service';

export * from '@shared/modules/ngx-spinner/ngx-spinner.component';
export * from '@shared/modules/ngx-spinner/ngx-spinner.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxSpinnerComponent
  ],
  exports: [
    NgxSpinnerComponent
  ],
  providers: []
})
export class NgxSpinnerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSpinnerModule,
      providers: []
    };
  }
}
