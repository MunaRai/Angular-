import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommodityCodeRoutingModule } from './commodity-code-routing.module';
import { CommodityCodeComponent } from './pages/commodity-code/commodity-code.component';
import { SharedModule } from '@shared/shared.module';
import { CommodityCodeFormPopupComponent } from './pages/commodity-code-form-popup/commodity-code-form-popup.component';
import { CommodityCodeServiceService } from './pages/commodity-code-service.service';

@NgModule({
  imports: [
    CommonModule,
    CommodityCodeRoutingModule,
    SharedModule
  ],
  providers: [
    CommodityCodeServiceService
  ],
  declarations: [CommodityCodeComponent, CommodityCodeFormPopupComponent],
  entryComponents: [CommodityCodeFormPopupComponent]
})
export class CommodityCodeModule { }
