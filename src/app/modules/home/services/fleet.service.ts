import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TrackerList } from '@shared/models/tracker-list.model';
import { HttpResult } from '@shared/models/http-result.model';

@Injectable()
export class FleetService {

  constructor(
    private http: HttpClient
  ) { }


  getTrackersList(): Observable<HttpResult> {
    return this.http.get<HttpResult>('/tracker/protocol/list');
  }

}
