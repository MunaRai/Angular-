import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuelSensorRoutingModule } from './fuel-sensor-routing.module';
import { FuelSensorComponent } from './pages/fuel-sensor/fuel-sensor.component';
import { SharedModule } from '@shared/shared.module';
import { FuelSensorPopupComponent } from './shared/fuel-sensor-popup/fuel-sensor-popup.component';

@NgModule({
  imports: [
    CommonModule,
    FuelSensorRoutingModule,
    SharedModule
    
  ],
  declarations: [FuelSensorComponent, FuelSensorPopupComponent],
  entryComponents :[FuelSensorPopupComponent]
})
export class FuelSensorModule { }
