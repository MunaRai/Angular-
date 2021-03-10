import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockedIpRoutingModule } from './locked-ip-routing.module';
import { LockedIpComponent } from './pages/locked-ip/locked-ip.component';
import { SharedModule } from '@shared/shared.module';
import { LockedIpService } from './services/locked-ip.service';

@NgModule({
  imports: [
    CommonModule,
    LockedIpRoutingModule,
    SharedModule
  ],
  declarations: [LockedIpComponent],
  providers: [LockedIpService]
})
export class LockedIpModule { }
