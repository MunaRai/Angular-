import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseRoutingModule } from './license-routing.module';
import { LicenseComponent } from './pages/license/license.component';
import { LicenseFormComponent } from './shared/license-form/license-form.component';
import { SharedModule } from '@shared/shared.module';
import { LicenseService } from './services/license.service';

@NgModule({
  imports: [
    CommonModule,
    LicenseRoutingModule,
    SharedModule
  ],
  providers:[LicenseService],
  declarations: [LicenseComponent, LicenseFormComponent],
  entryComponents:[LicenseFormComponent]
})
export class LicenseModule { }
