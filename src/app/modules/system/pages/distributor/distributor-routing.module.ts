import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistributorComponent } from './pages/distributor/distributor.component';

const routes: Routes = [
  {
    path:'',
    component:DistributorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributorRoutingModule { }
