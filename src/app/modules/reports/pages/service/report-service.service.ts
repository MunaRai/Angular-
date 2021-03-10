import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportServiceService {

  constructor(
    private http: HttpClient
  ) { }


  quickOverview(id,fromDate,toDate): Observable<any>{
    return this.http.get<any>('/report/quickOverview/'+id+'/'+fromDate+'/'+toDate);
  }
  

  expenseReport(id,expenseType,fromDate,toDate): Observable<any>{
    return this.http.get<any>('/trackerExpense/list/'+id+'/'+expenseType+'/'+fromDate+'/'+toDate);
  }


  overSpeed(id,fromDate,toDate,speedLimit): Observable<any> {
    return (
      this.http
        .get<any>('/report/overspeed/' + id + '/' + fromDate + '/' + toDate + '/' + speedLimit)
        .catch(err => {
          return Observable.throw(err);
        })
    )
  }

  trip({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', 'fromDate');
    return (
      this.http
        .get<any>('/trip/{trackerId}/{fromDate}/{toDate}"', { ...params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  event({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', 'fromDate');
    return (
      this.http
        .get<any>('/event/{trackerId}/{fromDate}/{toDate}', { ...params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  vehicleUtilization({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', 'fromDate');
    return (
      this.http
        .get<any>('/vehicleUtilization/{trackerId}/{fromDate}/{toDate}', { ...params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
  
  users({page, size, sort }):Observable<any>{
  const params = new HttpParams()
  .set('size', size)
  .set('page', page)
  .set('sort', 'fromDate');
  return (
    this.http
      .get<any>('/users}', { ...params })
      .catch(err => {
        return Observable.throw(err);
      })
  );
}


}
