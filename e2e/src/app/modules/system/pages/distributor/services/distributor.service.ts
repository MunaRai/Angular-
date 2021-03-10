import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class DistributorService {
  modelIds: string[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getDistributorsDetails({ page, size }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', 'adminName');
    return (
      this.http
        .get<any>('/distributor/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  addDistributor(distributor) {
    return (
      this.http
        .post('/distributor/add', { ...distributor })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  deleteDistributor(distributorId) {
    return (
      this.http
        .delete('/distributor/delete/' + distributorId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateDistributor(distributor) {
    return (
      this.http
        .put(`/distributor/edit/${distributor.distributorId}`, { ...distributor })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  searchDistributor(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('keyword', keyword.toLowerCase());
    return this.http.get<any>('/admin/search', { params })
      .pipe(
        map(data => {
          return data.result;
        })
      );
  }

  assignTrackerToDistributor(distributor) {
    return (
      this.http
        .put(`/tracker/assignToDistributor/${distributor.distributorId}`, { ...distributor })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  unAssignTrackerFromDistributor(distributor) {
    return (
      this.http
        .put(`/tracker/unAssignFromDistributor/${distributor.distributorId}`, { ...distributor })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  assignLicenseToDistributor(distributor) {
    return (
      this.http
        .post(`/distributor/addLicense/${distributor.distributorId}`, { ...distributor })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  viewDistributorDetail(distributorId) {
    return (
      this.http
        .get<any>('/distributor/show/' + distributorId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
}
