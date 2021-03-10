import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRoutingModule } from './model-routing.module';
import { ModelComponent } from './pages/model/model.component';
import { SharedModule } from '@shared/shared.module';
import { ModelFormComponent } from './shared/model-form/model-form.component';
import { ModelService } from './service/model.service';

@NgModule({
  imports: [
    CommonModule,
    ModelRoutingModule,
    SharedModule
  ],
  declarations: [ModelComponent, ModelFormComponent],
  entryComponents: [ModelFormComponent],

  providers:[
    ModelService
  ]
})
export class ModelModule { }
