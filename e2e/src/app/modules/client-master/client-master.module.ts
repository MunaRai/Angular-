import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientMasterRoutingModule } from './client-master-routing.module';
import { ClientMasterComponent } from './pages/client-master/client-master.component';
import { SharedModule } from '@shared/shared.module';
import { ClientMasterFormPopupComponent } from './pages/client-master-form-popup/client-master-form-popup.component';
import { ClientMasterServiceService } from './pages/client-master-service.service';

@NgModule({
  imports: [
    CommonModule,
    ClientMasterRoutingModule,
    SharedModule
  ],
  providers: [
    ClientMasterServiceService
  ],
  declarations: [ClientMasterComponent, ClientMasterFormPopupComponent],
  entryComponents: [
    ClientMasterFormPopupComponent
  ]
  
})
export class ClientMasterModule { }
