import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpResult } from '@shared/models/http-result.model';
import { Tracker } from '@shared/models/tracker.model';
import { map } from 'rxjs/operators';

@Injectable()
export class TrackerService {

  constructor(
    private http: HttpClient
  ) { }

  getTrackers( {page, size, sort} ): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', sort);

      return (
      this.http
        .get<any>('/tracker/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  addTracker(tracker) {
    return (
      this.http
        .post('/tracker/add', { ...tracker })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  deleteTracker(trackerId) {
    const params = new HttpParams().set('trackerId', trackerId);
    return (
      this.http
        .delete(`/tracker/delete`, { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateTracker(tracker: Tracker) {
    return (
      this.http
        .put(`/tracker/edit/${tracker.trackerId}`, { ...tracker })
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

  getUserFor(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('username', keyword.toLowerCase());
    return this.http
      .get<any>('/user/suggestUsername', { params })
      .pipe(
          map(data => {
          return data.result;
        })
      );
  }

  searchTracker(keyword): Observable<any> {
    return (
      this.http
        .get<any>('/tracker/search/' + keyword)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  // getTrackerFor(keyword: string): Observable<any[]> {
  //   const params = new HttpParams().set('filterText', keyword.toLowerCase());
  //   return this.http.get<any>('/tracker/search', { params })
  //     .pipe(
  //         map(data => {
  //         return data.result;
  //       })
  //     );
  // }

  getTrackerFor(keyword: string): Observable<any[]> {
    return this.http
      .get<any>('/tracker/search/' + keyword)
      .pipe(
        map(data => {
        return data.result;
        })
    );
  }

  getTrackerByModelId(modelId): Observable<any> {
    return (
      this.http
        .get<any>('/tracker/listbymodelnumber/' + modelId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  assignTrackerToNewUsers(tracker: Tracker) {
    return (
      this.http
        .put(`/tracker/moveToUser/${tracker.trackerId}`, { ...tracker })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  assignTrackerToRoute(trackerRoutes) {
    return this.http.post('/trackerRoutes/add', {...trackerRoutes});
  }

  getAllTrackers(): Observable<any> {
    return (
      this.http.get('/tracker/allList')
      .catch(err => {
        return Observable.throw(err);
      })
    );
  }

  getAllTrackerRoutes(): Observable<any> {
    return (
      this.http.get('/trackerRoutes/listTracker')
      .catch(err => {
        return Observable.throw(err);
      })
    );
  }


  getYearlyChartData(year: any) {
    return (
      this.http
        .get('/tracker/listByDateInsatalled/'+ year)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
  

  getMonthlyChartData() {
    return (
      this.http
        .get('/tracker/trackerCurrentMonthDetails')
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
}
