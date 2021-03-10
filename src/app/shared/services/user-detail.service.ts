import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '@shared/models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpResult } from '@shared/models/http-result.model';

@Injectable()
export class UserDetailService {

  public user: User;

  private user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) {

  }

  setUser(user: User): void {
    this.user = user;
    this.user$.next(user);
  }

  getUser(): Observable<User> {
    if (!this.user) {
      this.fetchUser()
        .subscribe(
          data => {
            this.setUser(data.result);
          },
          error => {

          }
        );
    }
    
    return this.user$.asObservable();
  }

  public fetchUser(): Observable<HttpResult> {
    return this.http.get<HttpResult>('/user/profile');
  }

  hasUserRole(roles: string[]): boolean {
    if (!this.user) {
      return false;
    }
    return roles.includes(this.user.userRole);
  }
}
