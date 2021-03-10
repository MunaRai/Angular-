import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpResult } from '@shared/models/http-result.model';
import { Observable } from 'rxjs/Observable';
import { Feature } from '@shared/models/feature.model';
import { Permission } from '@shared/models/permission.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UserProfile } from '@shared/models/userProfile.model';

@Injectable()
export class UserProfileService {

  constructor(
    private http: HttpClient
  ) { }

  getFeatures(): Observable<HttpResult> {
    return this.http.get<HttpResult>('/feature/list');
  }

  getPermissions(): Observable<HttpResult> {
    return this.http.get<HttpResult>('/permission/list');
  }

  createFeature(feature: Feature): Observable<HttpResult> {
    return this.http.post<HttpResult>('/feature/add', { ...feature });
  }

  createPermission(permission: Permission): Observable<HttpResult> {
    return (
      this.http
        .post<HttpResult>('/permission/add', { ...permission })
        .catch(err => Observable.throw(err))
    );
  }

  deleteFeature(featureId) {
    const params = new HttpParams().set('featureId', featureId);
    return (
      this.http
        .delete(`/feature/delete`, { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  deletePermission(permissionId) {
    const params = new HttpParams().set('permissionId', permissionId);
    return (
      this.http
        .delete(`/permission/delete`, { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  editFeature(feature: Feature, featureId) {
    return (
      this.http
        .put(`/feature/edit/${featureId}`, { ...feature })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  editPermission(permission: Permission, permissionId) {
    return (
      this.http
        .put(`/permission/edit/${permissionId}`, { ...permission })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
  changePassword(password) {
    return (
      this.http
        .post('/user/changePassword', { ...password })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


  saveUserProfile(userProfile: UserProfile, userId) {
    return (
      this.http
        .put(`/user/editUserProfile/${userId}`, { ...userProfile })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
}
