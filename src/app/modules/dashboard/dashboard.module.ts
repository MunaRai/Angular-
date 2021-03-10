import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NotificationsBarComponent } from './shared/components/notifications-bar/notifications-bar.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { SearchComponent } from './shared/components/search/search.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { ChangePasswordPopupComponent } from './pages/change-password-popup/change-password-popup.component';
import { FeaturesPermissionPanelComponent } from './shared/components/features-permission-panel/features-permission-panel.component';
import { UserProfileService } from './services/user-profile.service';
import {
  FeaturesPermissionsPopupFormComponent
} from './shared/components/features-permissions-popup-form/features-permissions-popup-form.component';
import { NavLinksFilterPipe } from './shared/pipes/nav-links-filter.pipe';
import { NotificationService } from './services/notification.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReminderBarComponent } from './shared/components/reminder-bar/reminder-bar.component';
import { ReminderService } from './services/reminder.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    InfiniteScrollModule
  ],
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationsBarComponent,
    UserProfileComponent,
    SearchComponent,
    ProfileSettingsComponent,
    ChangePasswordPopupComponent,
    FeaturesPermissionPanelComponent,
    FeaturesPermissionsPopupFormComponent,
    NavLinksFilterPipe,
    ReminderBarComponent,
  ],
  entryComponents: [
    ChangePasswordPopupComponent,
    FeaturesPermissionsPopupFormComponent
  ],
  providers: [
    UserProfileService,
    NotificationService,
    ReminderService,
  ]
})
export class DashboardModule { }
