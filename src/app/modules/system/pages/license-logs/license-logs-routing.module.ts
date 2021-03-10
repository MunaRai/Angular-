import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseLogsComponent } from './pages/license-logs/license-logs.component';

const routes: Routes = [
  {
    path:'',
    component:LicenseLogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseLogsRoutingModule { }
