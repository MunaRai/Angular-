import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Model } from '@shared/system-models/model.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ModelService {

  constructor(
    private http:HttpClient
  ) { }


  getModelsDetail({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', 'modelName');
    return (
      this.http
        .get<any>('/modelNumber/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  

  addModel(model) {
    return (
      this.http
        .post('/modelNumber/add', { ...model })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  deleteModel(modelId) {
    return (
      this.http
        .delete('/modelNumber/delete/'+ modelId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateModel(model: Model) {
    return (
      this.http
        .put(`/modelNumber/edit/${model.modelId}`, { ...model })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  searchModel(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('keyword', keyword.toLowerCase())
    return this.http.get<any>('/model/search', { params })
      .pipe(
          map(data => {
          return data.result;
        })
      );
  }



  //fetch every model number details for the tracker
  getAllModelNames() {
    return (
      this.http
        .get<any>('/modelNumber/allList')
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }



}
