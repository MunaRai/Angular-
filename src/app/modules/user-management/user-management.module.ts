import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { SharedModule } from '@shared/shared.module';
import { UserManagementFormPopupComponent } from './pages/user-management-form-popup/user-management-form-popup.component';
import { UserService } from './services/user.service';
import { AssignTrackerDistributorComponent } from './pages/assign-tracker-distributor/assign-tracker-distributor.component';
import { ModelService } from '../system/pages/model/service/model.service';
import { UserDetailService } from '@shared/services/user-detail.service';
import { TrackerService } from '../tracker-management/services/tracker.service';

@NgModule({
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule
  ],
  declarations: [
    UserManagementComponent,
    UserManagementFormPopupComponent,
    AssignTrackerDistributorComponent,
  ],
  entryComponents: [
    UserManagementFormPopupComponent,
    AssignTrackerDistributorComponent
  ],
  providers: [
    UserService,
    ModelService,
    TrackerService    
  ]
})
export class UserManagementModule { }
