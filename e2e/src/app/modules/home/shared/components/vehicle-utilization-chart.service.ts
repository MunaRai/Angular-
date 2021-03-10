import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { map } from 'rxjs/operators/map';

@Injectable()
export class VehicleUtilizationChartService {

  constructor(
    private http: HttpClient
  ) { }

  getVehicleUtilization(trackerImeiNumber: string): Observable<any>{
    if(trackerImeiNumber) {
      return (
        this.http
          .get<any>(`/tracker/protocol/vehicleUtilization/${trackerImeiNumber}`)
          .pipe(
            map(res => {
              const result = res.result || null;
              if (result) {
                return [
                  'Vechicle State', 
                  (+result.movingTime / 3600000)  ,
                  (+result.stoppedTime / 3600000) ,
                  (+result.idleTime / 3600000)
                ];
              }
              return res;
            })
          )
          .catch(err => {
            return Observable.throw(err);
          })
      );
    }
    return Observable.empty<any>();
  }
}
