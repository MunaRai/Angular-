import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserDetailService } from '@shared/services/user-detail.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private userDetailService: UserDetailService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userDetailService.fetchUser().pipe(
      map(res => {
        if (next.data.allowedRoles.includes(res.result.userRole)) {
          return true;
        } else {
          this.router.navigate(['404']);
          return false;
        }
      })
    );
  }
}
