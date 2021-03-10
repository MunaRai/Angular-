import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommodityCodeComponent } from './pages/commodity-code/commodity-code.component';

const routes: Routes = [
  {
    path: '',
    component: CommodityCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommodityCodeRoutingModule { }
