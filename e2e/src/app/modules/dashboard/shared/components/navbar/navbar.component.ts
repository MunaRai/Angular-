import { Component, Input } from '@angular/core';
import { User } from '@shared/models/user.model';
import { NavLink } from '@shared/models/nav-link.model';

@Component({
  selector: 'p2s-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isNavbarCollapsed = true;
  userRole: string;
  user: User;

  @Input()
  navLinks: NavLink[] = [];
}
