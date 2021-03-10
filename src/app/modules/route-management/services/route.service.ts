import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RouteService {

  constructor(
    private http: HttpClient
  ) { }

  getRouteDetails(): Observable<any> {
    return (
      this.http
        .get<any>('/routeStops/list')
        .catch(err => {
          return Observable.throw(err);

        })
    );
  }

  getTrackerRoutes(): Observable<any> {
    return (
      this.http
        .get<any>('/trackerRoutes/list')
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getTrackers(routeName): Observable<any> {
    return (
      this.http
        .get<any>('/trackerRoutes/getTrackersByRoute/' + routeName)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  addRoute(route) {
    return (
      this.http
        .post('/routeStops/add', { ...route })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  addCsv(file) {
    const formdata = new FormData();
    formdata.append('csvFile', file, file.name);
    return (
      this.http
        .post('/routeStops/csvUpload', formdata)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  upDateRoute(route) {
    return (
      this.http
        .put('/routeStops/edit/'+route.routeStopsId, { ...route })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  deleteRoute(routeStopsId) {
    const params = new HttpParams().set('routeStopsId', routeStopsId);
    return (
      this.http
        .delete('/routeStops/delete', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
}
