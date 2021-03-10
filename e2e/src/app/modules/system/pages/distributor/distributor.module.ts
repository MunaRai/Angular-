import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributorRoutingModule } from './distributor-routing.module';
import { DistributorComponent } from './pages/distributor/distributor.component';
import { DistributorFormComponent } from './shared/distributor-form/distributor-form.component';
import { SharedModule } from '@shared/shared.module';
import { DistributorService } from './services/distributor.service';
import { ModelService } from '../model/service/model.service';
import { TrackerAssignComponent } from './pages/tracker-assign/tracker-assign.component';
import { LicenseAssignComponent } from './pages/license-assign/license-assign.component';
import { TrackerService } from '../tracker/service/tracker.service';
import { LicenseService } from '../license/services/license.service';
import { ViewDistributorComponent } from './pages/view-distributor/view-distributor.component';
import { UnAssignTrackerComponent } from './pages/un-assign-tracker/un-assign-tracker.component';

@NgModule({
  imports: [
    CommonModule,
    DistributorRoutingModule,
    SharedModule,
  ],
  declarations: [DistributorComponent, DistributorFormComponent, TrackerAssignComponent, LicenseAssignComponent, ViewDistributorComponent, UnAssignTrackerComponent],

  providers :[DistributorService,ModelService,TrackerService,LicenseService],

  entryComponents:[DistributorFormComponent,TrackerAssignComponent,LicenseAssignComponent,ViewDistributorComponent,UnAssignTrackerComponent],
})
export class DistributorModule { }
