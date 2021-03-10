import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { CommodityCode } from '@shared/models/commodity-code.model';

@Injectable()
export class CommodityCodeServiceService {

  constructor(
    private http: HttpClient
  ) { }

  addCommodity(commodity){
    return(
      this.http
        .post(`/commodity/add`,{...commodity})
        .catch(err => {
          return Observable.throw(err);
        })
    )
  }

  getCommodity( {page, size, sort } ): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', sort);
    return (
      this.http
        .get<any>('/commodity/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  deleteCommodity(commodityCodeId){
    const params = new HttpParams().set('commodityCodeId', commodityCodeId);
    return (
      this.http
        .delete(`/commodity/delete`, { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateCommodity(commodity: CommodityCode, commodityCodeId){
    return (
      this.http
        .put(`/commodity/edit/${commodityCodeId}`, { ...commodity })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  //  searchCommodity(keyword): Observable<any> {
  //   return (
  //     this.http
  //       .get<any>('/commodity/search/' +keyword)
  //       .catch(err => {
  //         return Observable.throw(err);
  //       })
  //   );
  // }

  getCommodityFor(keyword: string): Observable<any[]> {
    return this.http
          .get<any>('/commodity/search/' +keyword)
          .pipe(
            map(data => {
            return data.result;
            })
    );
  }
  
  searchCommodity(keyword): Observable<any> {
    const params = new HttpParams().set('filterText', keyword.toLowerCase());
    return (
      this.http
        .get<any>('/commodity/search',{ params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

 


}
