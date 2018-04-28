import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HI');
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    const tokenValue = tokenObject.token;
     const request = req.clone({
       setHeaders: {
         Authorization: 'Token ' + tokenValue
       }
     });

    //   const request = req.clone({
    //     headers: new HttpHeaders().append('Authorization', ' Token 2ed04a684951ed8a647a1a44868ab62f031e9610')
    //  });

    console.log(request);
    return next.handle(request);
  }
}
