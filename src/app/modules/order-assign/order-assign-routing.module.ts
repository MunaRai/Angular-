import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderAssignComponent } from './pages/order-assign/order-assign.component';

const routes: Routes = [
  {
    path: '',
    component: OrderAssignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderAssignRoutingModule { }
