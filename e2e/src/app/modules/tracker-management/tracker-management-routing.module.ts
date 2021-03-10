import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerManagementComponent } from './pages/tracker-management/tracker-management.component';

const routes: Routes = [
  {
    path: '',
    component: TrackerManagementComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerManagementRoutingModule { }
