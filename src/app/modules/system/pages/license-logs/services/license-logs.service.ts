import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LicenseLogsService {

  constructor(
    private http: HttpClient
  ) { }

  
  getAllLicenseLogs(): Observable<any> {
    return (
      this.http.get('/licenseLog/list')
      .catch(err => {
        return Observable.throw(err);
      })
    );
  }
}
