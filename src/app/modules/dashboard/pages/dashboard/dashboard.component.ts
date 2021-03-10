import { Component, OnInit, HostBinding } from '@angular/core';
import { navLinks } from '../../navigation-links';
import { Router } from '@angular/router';
import { UserDetailService } from '@shared/services/user-detail.service';
import { UserRoleType } from '@shared/constants/user-role';
import { NavLink } from '@shared/models/nav-link.model';

@Component({
  selector: 'p2s-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  @HostBinding('class')
  class = 'd-flex flex-column flex-grow-1';

  navigationLinks: NavLink[] = navLinks;

  userRole = '';

  constructor(
    private userDetailService: UserDetailService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userDetailService.getUser()
      .subscribe(user => {
        if (this.router.url === '/dashboard' && user) {
          if (user.userRole === UserRoleType.ROLE_SYSTEM) {
            this.router.navigate(['/dashboard/system']);
          } else {
            this.router.navigate(['/dashboard/home']);
          }
        }
      });
  }

}
