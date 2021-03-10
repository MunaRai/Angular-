import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderManagementComponent } from './pages/order-management/order-management.component';

const routes: Routes = [
  {
    path: '',
    component: OrderManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
