import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule} from '@shared/shared.module';
import { DriverManagementComponent } from './pages/driver-management/driver-management.component';
import { DriverManagementPopupComponent } from './pages/driver-management-popup/driver-management-popup.component';
import { DriverManagementRoutingModule } from './driver-management-routing.module';
import { DriverManagementServiceService } from './service/driver-management-service.service';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';

@NgModule({
  imports: [
    CommonModule,
    DriverManagementRoutingModule,
    SharedModule
  ],
  providers:[
    DriverManagementServiceService
  ],

  declarations: [DriverManagementComponent, DriverManagementPopupComponent],
  entryComponents: [DriverManagementPopupComponent, DeleteConfirmationPopupComponent]
})
export class DriverManagementModule { }
