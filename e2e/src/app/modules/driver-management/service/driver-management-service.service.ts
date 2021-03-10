import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Driver } from '@shared/models/driver.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DriverManagementServiceService {

  constructor(
    private http: HttpClient
  ) { }


  addDriver(user) {
    return (
      this.http
        .post('/orderMngDriver/add', { ...user })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateDriver(driver: Driver, orderMngDriverId) {
    return (
      this.http
        .put(`/orderMngDriver/edit/${orderMngDriverId}`, { ...driver })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getDriverFor(keyword: string): Observable<any[]> {
    return this.http
          .get<any>('/orderMngDriver/search/' +keyword)
          .pipe(
            map(data => {
            return data.result;
            })
    );
  }

  deleteDriver(orderMngDriverId) {
    return (
      this.http
        .delete('/orderMngDriver/delete/'+ orderMngDriverId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
  
  searchDriver(keyword): Observable<any> {
    return  (
      this.http
        .get<any>('/orderMngDriver/search/' + keyword)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getDrivers({ size, page, sort }): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        size, page, sort
      }
    });
    return (
      this.http
        .get<any>('/orderMngDriver/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  // deleteDriver(orderMngDriverId){
  //   const params = new HttpParams().set('orderMngDriverId', orderMngDriverId);
  //   return (
  //     this.http
  //       .delete(`/orderMngDriver/delete`, { params })
  //       .catch(err => {
  //         return Observable.throw(err);
  //       })
  //   );
  // }

}
