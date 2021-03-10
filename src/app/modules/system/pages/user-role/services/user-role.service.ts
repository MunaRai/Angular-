import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserRole } from '@shared/system-models/user-role.model';
import { map } from 'rxjs/operators';


@Injectable()
export class UserRoleService {

  constructor(
    private http: HttpClient
  ) { }


  getUserRolesDetail(): Observable<any> {
    return (
      this.http
        .get<any>('/userRole/list')
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


  addUserRole(tracker) {
    return (
      this.http
        .post('/userRole/add', { ...tracker })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


  deleteUserRole(userRoleId) {
    return (
      this.http
        .delete('/userRole/delete/' + userRoleId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateUserRole(userRole: UserRole) {
    return (
      this.http
        .put(`/userRole/edit/${userRole.roleId}`, { ...userRole })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  searchUserRole(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('keyword', keyword.toLowerCase());
    return this.http.get<any>('/userRole/search', { params })
      .pipe(
        map(data => {
          return data.result;
        })
      );
  }

}
