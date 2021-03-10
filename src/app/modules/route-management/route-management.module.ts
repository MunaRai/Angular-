import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteManagementRoutingModule } from './route-management-routing.module';
import { RouteManagementComponent } from './pages/route-management/route-management.component';
import { RouteManagementPopupComponent } from './shared/route-management-popup/route-management-popup.component';
import { SharedModule } from '@shared/shared.module';
import { RouteService } from './services/route.service';
import { TrackerService } from '../tracker-management/services/tracker.service';
import { AssignTrackerPopupComponent } from './pages/assign-tracker-popup/assign-tracker-popup.component';
import { NguiMapModule } from '@ngui/map';
import { RouteStopListPopupComponent } from './pages/route-stop-list-popup/route-stop-list-popup.component';
import { RouteEditComponent } from './shared/route-edit/route-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouteManagementRoutingModule,
    SharedModule,
    NguiMapModule,
    FormsModule
  ],
  declarations: [
    RouteManagementComponent,
    RouteManagementPopupComponent, 
    AssignTrackerPopupComponent, 
    AssignTrackerPopupComponent, 
    RouteStopListPopupComponent, RouteEditComponent
  ],
  entryComponents :[
    RouteManagementPopupComponent,
    AssignTrackerPopupComponent,
    RouteStopListPopupComponent,
    RouteEditComponent
  ],
  providers:[RouteService,TrackerService]
})
export class RouteManagementModule { }
