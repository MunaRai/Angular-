import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoleRoutingModule } from './user-role-routing.module';
import { UserRoleComponent } from './pages/user-role/user-role.component';
import { SharedModule } from '@shared/shared.module';
import { UserRoleService } from './services/user-role.service';
import { UserRoleFormComponent } from './shared/user-role-form/user-role-form.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoleRoutingModule,
    SharedModule
  ],
  declarations: [UserRoleComponent, UserRoleFormComponent],

  providers:[
    UserRoleService
  ],

  entryComponents:[
    UserRoleFormComponent
  ]
})
export class UserRoleModule { }
