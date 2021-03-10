import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpResult } from '@shared/models/http-result.model';
import { Distributor } from '@shared/system-models/distributor.model';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers({ size, page, sort }): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        size, page, sort
      }
    });
    return (
      this.http
        .get<any>('/user/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getCustomerCareUsers({ size, page, sort }): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        size, page, sort
      }
    });
    return (
      this.http
        .get<any>('/customerCare/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  addUser(user) {
    return (
      this.http
        .post('/user/add', { ...user })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateUser(user: User, userId) {
    return (
      this.http
        .put(`/user/edit/${userId}`, { ...user })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  deleteUser(id) {
    return (
      this.http
        .delete(`/user/delete/${id}`)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getFeatures(): Observable<HttpResult> {
    return (
      this.http
        .get<HttpResult>('/feature/list')
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getTrackers(): Observable<HttpResult> {
    return (
      this.http
        .get<HttpResult>('/tracker/list')
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


  getLicensesOfDistributor(user){
    return(
      this.http.get<HttpResult>('/distributor/showbyuserid/'+user.userId)
    )
  }

  searchUser(keyword): Observable<any> {
    return  (
      this.http
        .get<any>('/user/search/' + keyword)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


  getDistributorByUserId(userId) {
    return (
      this.http
        .get<any>('/distributor/showbyuserid/'+ userId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  assignTrackerToDistributor(distributor: Distributor, clientId) {
    return (
      this.http
        .put(`/tracker/assignToUser/${clientId}`, { ...distributor })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

}
