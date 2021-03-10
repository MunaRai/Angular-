import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { CommodityCode } from '@shared/models/commodity-code.model';
import { Order } from '@shared/models/order.model';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderManagementService {

  constructor(
    private http: HttpClient
  ) { }

  searchCommodityCodes(term: string): Observable<any[]> {
    const params = new HttpParams().set('filterText', term.toLowerCase());
    return this.http.get<any>('/commodity/search', { params })
      .pipe(
        map(data => {
          return data.result;
        })
      );
  }

  addOrder(order) {
    return (
      this.http
        .post('/ordermanagement/add', { ...order })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


  getOrder({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', sort);
    return (
      this.http
        .get<any>('/ordermanagement/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getAvailableOrder({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', sort);
    return (
      this.http
        .get<any>('/ordermanagement/listavailable', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
  
  getTransit({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', sort);
    return (
      this.http
        .get<any>('/ordermanagement/listtransit', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getDelivered({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', sort);
    return (
      this.http
        .get<any>('/ordermanagement/listdelievered', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getCancelled({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', sort);
    return (
      this.http
        .get<any>('/ordermanagement/listcsncelled', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  deleteOrder(orderManagementId) {
    return (
      this.http
        .delete('/ordermanagement/delete/'+ orderManagementId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateOrder(ordermanagement: Order, orderManagementId) {
    return (
      this.http
        .put(`/ordermanagement/edit/${orderManagementId}`, { ...ordermanagement })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  cancelOrder(orderManagementId){
    return (
      this.http
        .post(`/ordermanagement/ordercancel/`, +orderManagementId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  searchOrder(keyword): Observable<any> {
    return (
      this.http
        .get<any>('/ordermanagement/search/' +keyword)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

}
