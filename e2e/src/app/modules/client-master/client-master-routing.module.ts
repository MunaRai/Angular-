import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMasterComponent } from './pages/client-master/client-master.component';

const routes: Routes = [
  {
    path: '',
    component: ClientMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientMasterRoutingModule { }
