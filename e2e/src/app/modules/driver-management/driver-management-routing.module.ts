import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverManagementComponent } from './pages/driver-management/driver-management.component';

const routes: Routes = [
  {
    path: '',
    component: DriverManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverManagementRoutingModule { }
