import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAssignComponent } from './pages/order-assign/order-assign.component';
import { SharedModule } from '@shared/shared.module';
import { OrderAssignRoutingModule } from './order-assign-routing.module';
import { PipePipe } from './pipe.pipe';
import { OrderAssignService } from './service/order-assign.service';
import { OrderManagementService } from '../order-management/services/order-management.service';
import { OrderAssignPopupComponent } from './pages/order-assign/order-assign-popup/order-assign-popup.component';
import { TrackerService } from '../tracker-management/services/tracker.service';
import { OrderCancelPopupComponent } from './pages/order-assign/order-cancel-popup/order-cancel-popup.component';
import { DriverManagementServiceService } from '../driver-management/service/driver-management-service.service';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { ViewOrderAssignComponent } from './pages/view-order-assign/view-order-assign.component';

@NgModule({
  imports: [
    CommonModule,
    OrderAssignRoutingModule,
    SharedModule
  ],
  providers: [
    OrderAssignService, OrderManagementService,DriverManagementServiceService, TrackerService
  ],
  entryComponents:[OrderAssignPopupComponent, OrderCancelPopupComponent, DeleteConfirmationPopupComponent, ViewOrderAssignComponent],
  declarations: [OrderAssignComponent, PipePipe, OrderAssignPopupComponent, OrderCancelPopupComponent, ViewOrderAssignComponent]
})

export class OrderAssignModule { }
