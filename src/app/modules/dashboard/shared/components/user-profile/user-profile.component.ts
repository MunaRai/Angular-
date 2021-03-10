import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailService } from '@shared/services/user-detail.service';

@Component({
  selector: 'p2s-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private userDetailService: UserDetailService
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('p2s_access_token');
    this.userDetailService.setUser(null);
    window.location.reload();
    this.router.navigate(['login']);

  }

}
