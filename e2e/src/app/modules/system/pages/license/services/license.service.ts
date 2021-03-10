import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { License } from '@shared/system-models/license.model';
import { map } from 'rxjs/operators';

@Injectable()
export class LicenseService {

  constructor(
    private http: HttpClient
  ) { }

  getLicenseDetails({ page, size, sort }): Observable<any> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('sort', 'licenseName');
    return (
      this.http
        .get<any>('/license/list', { params })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getLicenseCount(): Observable<any> {
    return (
      this.http
        .get<any>('/license/countSoldLicense')
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


  addLicense(license) {
    return (
      this.http
        .post('/license/add', { ...license })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
  

  deleteLicense(licenseId) {
    return (
      this.http
        .delete('/license/delete/'+ licenseId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  updateLicense(license: License) {
    return (
      this.http
        .put(`/license/edit/${license.licenseId}`, { ...license })
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


  searchLicense(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('keyword', keyword.toLowerCase())
    return this.http.get<any>('/license/search', { params })
      .pipe(
          map(data => {
          return data.result;
        })
      );
  }


  getAllLicenses():Observable<any>{
    return (
        this.http.get('/license/allList')
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }


}
