import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpResult } from '@shared/models/http-result.model';
import { OrderAssign } from '@shared/models/order-assign.model';

@Injectable()
export class OrderAssignService {

  constructor(
    private http: HttpClient
  ) { }

  getOrderAssignList({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', 'adminName');
    return (
      this.http
        .get<any>('/orderassign/list', { params })
        .catch(err => {
          return Observable.throw(err);
          
        })
    );
  }

  assignOrder(orderAssign){
    return(
      this.http
        .post(`/orderassign/add`, {...orderAssign})
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateOrderAssign(orderAssign) {
    
    return (
      this.http
        .put(`/orderassign/edit/${orderAssign.orderAssignId}`, { ...orderAssign })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
 
  // cancelAssignedOrder(orderAssignId){
  //   const params = new HttpParams().set('orderAssignId', orderAssignId);
  //   return (
  //     this.http
  //       .post(`/orderassign/ordercancel`, { params })
  //       .catch(err => {
  //         return Observable.throw(err);
  //       })
  //   );
  // }
  cancelAssignedOrder(orderAssignId) {
    return (
      this.http
        .delete('/orderassign/ordercancel/'+ orderAssignId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  deleteAssign(orderAssignId) {
    return (
      this.http
        .delete('/orderassign/delete/'+ orderAssignId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  searchAssignOrder(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('keyword', keyword.toLowerCase())
    return this.http.get<any>('/orderassign/search', { params })
      .pipe(
          map(data => {
          return data.result;
        })
      );
  }

}
