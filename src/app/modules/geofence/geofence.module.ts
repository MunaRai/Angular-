import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeofenceRoutingModule } from './geofence-routing.module';
import { GeofenceComponent } from './pages/geofence/geofence.component';
import { SharedModule } from '@shared/shared.module';
import { GeofenceManagementFormPopupComponent } from './pages/geofence-management-form-popup/geofence-management-form-popup.component';
import { GeofenceMapComponent } from './shared/components/geofence-map/geofence-map.component';
import { GeofenceAssignmentPopupComponent } from './pages/geofence-assignment-popup/geofence-assignment-popup.component';
import { GeofenceService } from './services/geofence.service';

@NgModule({
  imports: [
    CommonModule,
    GeofenceRoutingModule,
    SharedModule
  ],
  declarations: [
    GeofenceComponent,
    GeofenceManagementFormPopupComponent,
    GeofenceMapComponent,
    GeofenceAssignmentPopupComponent,
  ],
  entryComponents: [
    GeofenceManagementFormPopupComponent,
    GeofenceAssignmentPopupComponent
  ],
  providers: [
    GeofenceService
  ]
})
export class GeofenceModule { }
