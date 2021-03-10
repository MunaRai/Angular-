import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NewPasswordFormComponent } from './pages/new-password-form/new-password-form.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent,
  },
  {
    path: ':token',
    component: NewPasswordFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
