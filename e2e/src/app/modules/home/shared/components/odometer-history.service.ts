import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OdometerHistoryService {

  constructor(
    private http: HttpClient
  ) { }

  
  getOdometerHistoryOfTracker(trackerId) {
    // const params = new HttpParams().set('trackerId', trackerId);
    return (
      this.http
          .get('/odometer/list/'+ trackerId)
          .catch(err => {
        return Observable.throw(err);
        })
    );
  }

  updateOdometerReading(tracker,trackerId) {
    return (
      this.http
          .put(`/tracker/setOdometer/${trackerId}`, { ...tracker })
          .catch(err => {
        return Observable.throw(err);
        })
    );
  }
}
