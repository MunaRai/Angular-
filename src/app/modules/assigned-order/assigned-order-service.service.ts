import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';

@Injectable()
export class AssignedOrderServiceService {

  constructor(
    private http: HttpClient
  ) { }

  assignOrder(commodity) {
    return (
      this.http
        .post(`/commodity/add`, { ...commodity })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getAssignedOrder({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', 'commodityCode');
    return (
      this.http
        .get<any>('/commodity/list', { ...params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

}
