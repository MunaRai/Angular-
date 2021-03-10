import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LockedIpComponent } from './pages/locked-ip/locked-ip.component';

const routes: Routes = [
  {
    path: '',
    component: LockedIpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockedIpRoutingModule { }
