import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerManagementRoutingModule } from './tracker-management-routing.module';
import { TrackerManagementComponent } from './pages/tracker-management/tracker-management.component';
import { SharedModule } from '@shared/shared.module';
import { TrackerFormPopupComponent } from './pages/tracker-form-popup/tracker-form-popup.component';
import { TrackerService } from './services/tracker.service';
import { MoveTrackerUserComponent } from './pages/move-tracker-user/move-tracker-user.component';
import { UserService } from '../user-management/services/user.service';
import { TrackerUsersListComponent } from './pages/tracker-users-list/tracker-users-list.component';
import { ShowTrackerDetailsComponent } from './pages/show-tracker-details/show-tracker-details.component';

@NgModule({
  imports: [
    CommonModule,
    TrackerManagementRoutingModule,
    SharedModule
  ],

  declarations: [
    TrackerManagementComponent,
    TrackerFormPopupComponent,
    MoveTrackerUserComponent,
    TrackerUsersListComponent,
    ShowTrackerDetailsComponent
  ],
  entryComponents: [
    TrackerFormPopupComponent,
    MoveTrackerUserComponent,
    TrackerUsersListComponent,
    ShowTrackerDetailsComponent
  ],
  providers: [
    TrackerService,
    UserService
  ]
})
export class TrackerManagementModule { }
