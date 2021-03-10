import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<any> {
    return (
      this.http
        .post<User>('/login', {username, password})
        .catch( err => {
          return Observable.throw(err.error);
        })
    );
  }


  checkEmailVerification(code) {
    // const params = new HttpParams().set('code', code);
    return (
      this.http
        .get<any>('/verify-email/' + code)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

}
