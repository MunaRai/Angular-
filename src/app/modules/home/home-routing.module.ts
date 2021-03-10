import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FleetComponent } from './pages/fleet/fleet.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'fleet',
        component: FleetComponent
      },

      {
        path: 'order',
        component: OrderComponent
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'fleet'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
