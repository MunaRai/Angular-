import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemperatureSensorComponent } from './pages/temperature-sensor/temperature-sensor.component';

const routes: Routes = [
  {
    path: '',
    component: TemperatureSensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemperatureSensorRoutingModule { }
