import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerComponent } from './pages/tracker/tracker.component';
import { TrackerFormComponent } from './shared/tracker-form/tracker-form.component';
import { SharedModule } from '@shared/shared.module';
import { ModelService } from '../model/service/model.service';
import { TrackerService } from './service/tracker.service';

@NgModule({
  imports: [
    CommonModule,
    TrackerRoutingModule,
    SharedModule
  ],
  declarations: [TrackerComponent, TrackerFormComponent],
  entryComponents: [TrackerFormComponent], 
  providers:[
    TrackerService,
    ModelService
  ]

})
export class TrackerModule { }
