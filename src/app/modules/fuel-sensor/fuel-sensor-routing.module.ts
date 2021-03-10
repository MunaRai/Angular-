import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuelSensorComponent } from './pages/fuel-sensor/fuel-sensor.component';

const routes: Routes = [
  {
    path:'',
    component:FuelSensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuelSensorRoutingModule { }
