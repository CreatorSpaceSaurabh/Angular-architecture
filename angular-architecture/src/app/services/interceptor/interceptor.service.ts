import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (window.localStorage.getItem('userData')) {
      let data = localStorage.getItem('userData');
      let token = JSON.parse(data || '{}').token;
      req = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }
    return next.handle(req);
  }
}
