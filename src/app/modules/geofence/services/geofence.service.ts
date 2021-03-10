import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { Observable } from 'rxjs/Observable';
import { BackendResponse } from '@shared/models/backend-response.model';
import { Tracker } from '@shared/models/tracker.model';
import { map } from 'rxjs/operators';
import { Geofence } from '@shared/models/geofence.model';

@Injectable()
export class GeofenceService {

  constructor(
    private http: HttpClient
  ) { }

  getTrackers( pagination: PaginationResult = new PaginationResult() ): Observable<BackendResponse<Tracker[]>> {
    const { page, size, sort } = pagination;
    const params = new HttpParams()
      .set('size', `${size}`)
      .set('page', `${page}`)
      .set('sort', `${sort}`);

    return (
      this.http
        .get<Tracker[]>('/tracker/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getGeofences(
    pagination: PaginationResult = new PaginationResult()
  ): Observable<BackendResponse<Geofence[]>> {
    const { page, size, sort } = pagination;
    const params = new HttpParams()
      .set('size', `${size}`)
      .set('page', `${page}`)
      .set('sort', `${sort}`);

    return (
      this.http
        .get<BackendResponse<Geofence[]>>('/geofence/list', { params })
        .pipe(
          map(res => {
            const result = res.result.map(gf => {
              return this.setGeometryList(gf);
            });
            return {...res, result};
          })
        )
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  addGeofence(gf: Geofence): Observable<BackendResponse<Geofence>> {
    return (
      this.http
        .post<BackendResponse<Geofence>>('/geofence/add', gf)
        .pipe(
          map((res) => {
            const result = this.setGeometryList(res.result);
            return {...res, result};
          })
        )
        .catch(err => Observable.throw(err))
    );
  }

  deleteGeofence(id: string): Observable<BackendResponse<boolean>> {
    const params = new HttpParams().set('geofenceId', id);
    return (
      this.http
        .delete('/geofence/delete', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateGeofence(geofence: Geofence) {
    return (
      this.http
        .put<BackendResponse<Geofence>>(`/geofence/edit/${geofence.geofenceId}`, { ...geofence })
        .pipe(
          map((res) => {
            const result = this.setGeometryList(res.result);
            return {...res, result};
          })
        )
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  setGeometryList(gf: Geofence) {
    gf.geofenceGeometryList = [];
    if (gf.geofenceType === 'polygon') {
      const points: Array<{x: number, y: number}> = gf.geoJsonPolygon.points.slice(0, -1);
      if (points.length) {
        gf.geofenceGeometryList = points.map(point => ({lat: point.y, lng: point.x }));
      }
    }
    return gf;
  }

}
