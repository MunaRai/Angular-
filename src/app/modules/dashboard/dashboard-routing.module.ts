import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { UserRoleGuard } from '@shared/guards/user-role/user-role.guard';
import { UserRoleType } from '@shared/constants/user-role';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: 'app/modules/home/home.module#HomeModule',
      },

      {
        path: 'tracker-management',
        loadChildren: 'app/modules/tracker-management/tracker-management.module#TrackerManagementModule',
      },

      {
        path: 'live-tracking',
        loadChildren: 'app/modules/live-tracking/live-tracking.module#LiveTrackingModule',
      },

      {
        path: 'geofence',
        loadChildren: 'app/modules/geofence/geofence.module#GeofenceModule',
        data: {
          allowedRoles: [UserRoleType.ROLE_USER]
        },
        canActivate: [UserRoleGuard]
      },

      {
        path: 'user-management',
        loadChildren: 'app/modules/user-management/user-management.module#UserManagementModule',
      },
      {
        path: 'temperature-sensor',
        loadChildren: 'app/modules/temperature-sensor/temperature-sensor.module#TemperatureSensorModule',
      },
      {
        path: 'fuel-sensor',
        loadChildren: 'app/modules/fuel-sensor/fuel-sensor.module#FuelSensorModule',
      },

      {
        path: 'client-master',
        loadChildren: 'app/modules/client-master/client-master.module#ClientMasterModule',
      },

      {
        path: 'order-assign-board',
        loadChildren: 'app/modules/order-assign/order-assign.module#OrderAssignModule',
      },

      {
        path: 'order-management',
        loadChildren: 'app/modules/order-management/order-management.module#OrderManagementModule',
      },

      {
        path: 'commodity-code',
        loadChildren: 'app/modules/commodity-code/commodity-code.module#CommodityCodeModule',
      },

      {
        path: 'reports',
        loadChildren: 'app/modules/reports/reports.module#ReportsModule',
      },
      {
        path: 'route',
        loadChildren: 'app/modules/route-management/route-management.module#RouteManagementModule',
      },

      {
        path: 'profile-settings',
        component: ProfileSettingsComponent
      },

      {
        path: 'driver-management',
        loadChildren: 'app/modules/driver-management/driver-management.module#DriverManagementModule',
      },

      {
        path: 'license-logs',
        loadChildren: 'app/modules/system/pages/license-logs/license-logs.module#LicenseLogsModule',
      },

      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: 'home'
      // },

      // routes for system-panel
      {
        path: 'system',
        loadChildren: 'app/modules/system/system.module#SystemModule',
        data: {
          allowedRoles: [UserRoleType.ROLE_SYSTEM]
        },
        canActivate: [UserRoleGuard]
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
