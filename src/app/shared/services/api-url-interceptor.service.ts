import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { environment } from 'environments/environment';

@Injectable()
export class ApiUrlInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.params.has('interceptor') &&
      req.params.get('interceptor') === 'skip'
    ) {
      const params = req.params.delete('interceptor');
      return next.handle(req.clone({ params }));
    }

    let alteredReq = req.clone({
      url: environment.apiUrl + req.url,
    });
    const headers = req.headers;
    const token = localStorage.getItem('p2s_access_token');
    const header = !req.headers.get('Authorization');
    if (token && header) {
      headers.append('Authorization', token);
      alteredReq = alteredReq.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }
    return next.handle(alteredReq).do(
      evt => {},
      err => {
        if (err instanceof HttpErrorResponse) {
        }
      }
    );
  }
}
