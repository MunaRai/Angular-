import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeofenceComponent } from './pages/geofence/geofence.component';

const routes: Routes = [
  {
    path: '',
    component: GeofenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeofenceRoutingModule { }
