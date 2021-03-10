import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LockedIpService {

  constructor(
    private http:HttpClient,
  ) { }


  //fetch all locked ip address
  getAllLockedIps(): Observable<any> {
    return (
      this.http.get('/lockedIp')
      .catch(err => {
        return Observable.throw(err);
      })
    );
  }

  //unlock ip address
  unLockIpAddress(ipAddress) {
    return (
      this.http.get('/unlockIp/'+ ipAddress)
      .catch(err => {
        return Observable.throw(err);
      })
  );
  }
}
