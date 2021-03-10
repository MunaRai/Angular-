import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveTrackingRoutingModule } from './live-tracking-routing.module';
import { LiveTrackingComponent } from './pages/live-tracking/live-tracking.component';
import { SharedModule } from '@shared/shared.module';
import { LiveMapComponent } from './pages/live-tracking/live-map/live-map.component';
import { HistoryMapComponent } from './pages/live-tracking/history-map/history-map.component';
// import { GenerateReminderPopupComponent } from './pages/reminder/generate-reminder-popup/generate-reminder-popup.component';
import { RouteMapComponent } from './pages/live-tracking/route-map/route-map.component';

@NgModule({
  imports: [
    CommonModule,
    LiveTrackingRoutingModule,
    SharedModule,
  ],
  declarations: [
    LiveTrackingComponent,
    LiveMapComponent,
    HistoryMapComponent,
    // GenerateReminderPopupComponent,
    RouteMapComponent
  ]
})
export class LiveTrackingModule { }
