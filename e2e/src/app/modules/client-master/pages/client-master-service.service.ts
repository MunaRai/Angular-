import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpResult } from '@shared/models/http-result.model';
import { CommodityCode } from '@shared/models/commodity-code.model';
import { ClientMaster } from '@shared/models/client-master.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ClientMasterServiceService {

  constructor(
    private http: HttpClient
  ) { }

  addClientMaster(clientMaster) {
    return(
      this.http
        .post(`/clientmaster/add`, {...clientMaster})
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getClientMaster({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', sort);
    return (
      this.http
        .get<any>('/clientmaster/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  deleteClientMaster(clientMasterId) {
    const params = new HttpParams().set('clientMasterId', clientMasterId);
    return (
      this.http
        .delete(`/clientmaster/delete`, { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateClientMaster(clientMaster: ClientMaster, clientMasterId) {
    return (
      this.http
        .put(`/clientmaster/edit/${clientMasterId}`, { ...clientMaster })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
  getClientFor(keyword: string): Observable<any[]> {
    return this.http
          .get<any>('/clientmaster/search/' +keyword)
          .pipe(
            map(data => {
            return data.result;
            })
    );
  }
  // getClientFor(keyword): Observable<any[]> {
  //   const params = new HttpParams().set('filterText', keyword.toLowerCase());
  //   return this.http.get<any>('/clientmaster/search/', { params })
  //     .pipe(
  //         map(data => {
  //         return data.result;
  //       })
  //     );
  // }

  // searchClient(keyword): Observable<any> {
  //   const params = new HttpParams().set('filterText', keyword.toLowerCase());
  //   return (
  //     this.http
  //       .get<any>('/clientmaster/search',{ params })
  //       .catch(err => {
  //         return Observable.throw(err);
  //       })
  //   );
  // }
  searchClient(keyword): Observable<any> {
    return (
      this.http
        .get<any>('/clientmaster/search/' +keyword)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
}
