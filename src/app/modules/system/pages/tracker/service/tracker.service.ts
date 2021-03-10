import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tracker } from '@shared/system-models/tracker.model';
import { map } from 'rxjs/operators';

@Injectable()
export class TrackerService {

  constructor(
    private http:HttpClient,
  ) { }



  getTrackerDetail({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', 'trackerName');
    return (
      this.http
        .get<any>('/tracker/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getAllUnassignedTrackers():Observable<any>{
    return (
        this.http.get('/tracker/toAssignAllList')
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


  getAllTrackers(): Observable<any> {
    return (
      this.http.get('/tracker/allList')
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
    return (
      this.http
        .delete('/tracker/delete/'+trackerId)
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

  searchTracker(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('keyword', keyword.toLowerCase())
    return this.http.get<any>('/tracker/search', { params })
      .pipe(
          map(data => {
          return data.result;
        })
      );
  }


}
