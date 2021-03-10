import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveTrackingComponent } from './pages/live-tracking/live-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: LiveTrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveTrackingRoutingModule { }
