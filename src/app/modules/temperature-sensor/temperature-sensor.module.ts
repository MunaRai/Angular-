import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperatureSensorRoutingModule } from './temperature-sensor-routing.module';
import { TemperatureSensorComponent } from './pages/temperature-sensor/temperature-sensor.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TemperatureSensorRoutingModule,
    SharedModule
  ],
  declarations: [TemperatureSensorComponent]
})
export class TemperatureSensorModule { }
