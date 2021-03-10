import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementComponent } from './pages/order-management/order-management.component';
import { SharedModule } from '@shared/shared.module';
import { OrderManagementFormPopupComponent } from './pages/order-management-form-popup/order-management-form-popup.component';
import { ClientMasterSearchComponent } from './shared/client-master-search/client-master-search.component';
import { OrderManagementService } from './services/order-management.service';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { ClientMasterServiceService } from '../client-master/pages/client-master-service.service';
import { CommodityCodeServiceService } from '../commodity-code/pages/commodity-code-service.service';
import { OrderAssignService } from '../order-assign/service/order-assign.service';
import { OrderCancelPopupComponent } from '../order-assign/pages/order-assign/order-cancel-popup/order-cancel-popup.component';
import { OrderAssignModule } from '../order-assign/order-assign.module';

@NgModule({
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    SharedModule,
    OrderAssignModule
  ],
  declarations: [OrderManagementComponent, OrderManagementFormPopupComponent, ClientMasterSearchComponent],
  entryComponents: [OrderManagementFormPopupComponent, OrderCancelPopupComponent],
  providers: [OrderManagementService, ClientMasterServiceService, CommodityCodeServiceService, OrderAssignService]
})
export class OrderManagementModule { }
