import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseLogsRoutingModule } from './license-logs-routing.module';
import { LicenseLogsComponent } from './pages/license-logs/license-logs.component';
import { SharedModule } from '@shared/shared.module';
import { LicenseLogsService } from './services/license-logs.service';
import { ViewTrackerImeiComponent } from './pages/view-tracker-imei/view-tracker-imei.component';

@NgModule({
  imports: [
    CommonModule,
    LicenseLogsRoutingModule,
    SharedModule
  ],
  declarations: [LicenseLogsComponent, ViewTrackerImeiComponent],
  providers: [LicenseLogsService],
  entryComponents: [ViewTrackerImeiComponent]
})
export class LicenseLogsModule { }
