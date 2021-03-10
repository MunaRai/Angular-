import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'model',
    loadChildren: 'app/modules/system/pages/model/model.module#ModelModule',
  },
  {
    path: 'tracker',
    loadChildren: 'app/modules/system/pages/tracker/tracker.module#TrackerModule',
  },
  {
    path: 'userRole',
    loadChildren: 'app/modules/system/pages/user-role/user-role.module#UserRoleModule',
  },

  {
    path: 'license',
    loadChildren: 'app/modules/system/pages/license/license.module#LicenseModule',
  },
  // {
  //   path: 'feature',
  //   loadChildren: 'app/modules/system/pages/feature/feature.module#FeatureModule',
  // },
  {
    path: 'distributor',
    loadChildren: 'app/modules/system/pages/distributor/distributor.module#DistributorModule',
  },
  {
    path: 'locked-ips',
    loadChildren: 'app/modules/system/pages/locked-ip/locked-ip.module#LockedIpModule',
  },
  // {
  //   path:'license-logs',
  //   loadChildren: 'app/modules/system/pages/license-logs/license-logs.module#LicenseLogsModule',
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
