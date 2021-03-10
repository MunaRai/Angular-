import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './pages/feature/feature.component';
import { FeatureFormComponent } from './shared/feature-form/feature-form.component';
import { SharedModule } from '@shared/shared.module';
import { FeatureService } from './service/feature.service';

@NgModule({
  imports: [
    CommonModule,
    FeatureRoutingModule,
    SharedModule
  ],
  declarations: [FeatureComponent, FeatureFormComponent],
  providers: [FeatureService],
  entryComponents:[FeatureFormComponent]
})
export class FeatureModule { }
