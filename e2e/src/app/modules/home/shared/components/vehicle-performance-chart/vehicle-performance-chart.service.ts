import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../../../../node_modules/rxjs';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { format } from 'date-fns';

@Injectable()
export class VehiclePerformanceChartService {

  loading$: Subject<boolean> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  getVehiclePerformance(trackerImeiNumber: string): Observable<any> {
    if (trackerImeiNumber) {
      return (
        this.http
          .get<any>(`/tracker/protocol/vehiclePerformance/${trackerImeiNumber}`)
          .pipe(
            map(chartDataArray => {
              if (chartDataArray) {
                return chartDataArray.map(chartData => {
                  if (chartData) {
                    return [
                      format(new Date(chartData.dateCreated), 'ha'),
                      +chartData.fuel,
                      +(Math.round(chartData.speed)),
                      +(Math.round(chartData.distance)),
                    ];
                  }
                  return [];
                });
              }
            })
          )
          .catch(err => {
            return Observable.throw(err);
          })
      );
    }
    return Observable.empty<any>();
  }

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
