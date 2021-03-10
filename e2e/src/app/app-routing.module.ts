import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth/auth.guard';
import { Page404Component } from './page-404/page-404.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/modules/login/login.module#LoginModule',
  },
  {
    path: 'reset-password',
    loadChildren: 'app/modules/reset-password/reset-password.module#ResetPasswordModule'
  },
  {
    path: 'reset-password/:token',
    loadChildren: 'app/modules/reset-password/reset-password.module#ResetPasswordModule'
  },
  {
    path: 'verify-email/:code',
    loadChildren: 'app/modules/verify-email/verify-email.module#VerifyEmailModule',
  },
  {
    path: 'dashboard',
    loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard],
  },

  {
    path: '404',
    component: Page404Component
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },

  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
