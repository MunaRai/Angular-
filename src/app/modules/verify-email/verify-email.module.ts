import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailRoutingModule } from './verify-email-routing.module';
import { LoginService } from '../login/services/login.service';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VerifyEmailRoutingModule,
    SharedModule
  ],
  declarations: [VerifyEmailComponent],
  providers: [
    LoginService,
  ]
})
export class VerifyEmailModule { }
