import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NewPasswordFormComponent } from './pages/new-password-form/new-password-form.component';
import { ResetPasswordService } from './services/reset-password.service';
import { FormControl, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ResetPasswordComponent, NewPasswordFormComponent],
  providers: [ResetPasswordService]
})
export class ResetPasswordModule { }
