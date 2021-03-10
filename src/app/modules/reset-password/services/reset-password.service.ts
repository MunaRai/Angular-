import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResetPasswordService {

  constructor(
    private http: HttpClient
  ) { }

  sendEmail(username) {
    return (
      this.http
        .get<any>('/user/forgotpassword/' + username)
        // .catch(err => {
        //   return Observable.throw(err);
        // })
    );
  }

  resetPassword(token, formData) {
    return (
      this.http
        .post(`/reset-password/${token}` , {...formData})
        // .catch(err => {
        //   return Observable.throw(err);
        // })
    );
  }

  checkToken(token) {
    return (
      this.http
        .get<any>('/reset-password/' + token)
        // .catch(err => {
        //   return Observable.throw(err);
        // })
    );
  }
}
