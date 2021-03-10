import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { User } from '@shared/models/user.model';
import { UserDetailService } from '@shared/services/user-detail.service';
import { NavLink } from '@shared/models/nav-link.model';

@Component({
  selector: 'p2s-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  @HostBinding('class')
  classes = 'd-flex flex-column col p-0';

  isSidebarExpanded = false;

  @Input()
  sidebarLinks: NavLink[] = [];

  user: User;

  constructor(
    private userDetailService: UserDetailService,
  ) { }

  ngOnInit() {
    this.fetchLoggedInUser();
  }

  fetchLoggedInUser() {
    this.userDetailService.getUser()
      .subscribe(
        user => {
          this.user = user;
        }
      );
  }
}
