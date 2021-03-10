import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteManagementComponent } from './pages/route-management/route-management.component';

const routes: Routes = [
  {
    path:'',
    component: RouteManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteManagementRoutingModule { 

 

}
