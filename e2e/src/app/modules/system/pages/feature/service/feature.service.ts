import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Feature } from '@shared/system-models/feature.model';

@Injectable()
export class FeatureService {

  constructor(
    private http: HttpClient
  ) { }

  getFeatureDetails({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', 'featureName');
    return (
      this.http
        .get<any>('/feature/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  addFeature(feature) {
    return (
      this.http
        .post('/feature/add', { ...feature })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
  

  deleteFeature(featureId) {
    return (
      this.http
        .delete('/feature/delete/'+ featureId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateFeature(feature: Feature) {
    return (
      this.http
        .put(`/feature/edit/${feature.featureId}`, { ...feature })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


  searchFeature(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('keyword', keyword.toLowerCase())
    return this.http.get<any>('/feature/search', { params })
      .pipe(
          map(data => {
          return data.result;
        })
      );
  }


  getAllFeatures():Observable<any>{
    return (
        this.http.get('/feature/allList')
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

}
