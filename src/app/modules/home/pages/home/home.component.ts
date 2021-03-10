import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailService } from '@shared/services/user-detail.service';
import { UserRoleType } from '@shared/constants/user-role';

@Component({
  selector: 'p2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  @HostBinding('class')
  class = 'd-flex flex-column col p-0 pos-r x-overflow-none';

  isDashboardSwitchOpen = false;

  enableDashboardSwitch = true;

  constructor() { }

}
