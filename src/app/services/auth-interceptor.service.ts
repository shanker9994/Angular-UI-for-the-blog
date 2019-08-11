import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { stringify } from 'querystring';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  // authorizationToken: string;

  constructor(private auth: AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('request on the way');
    return this.auth.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // tslint:disable-next-line: object-literal-key-quotes
            'Authorization': user.authorizationToken
          })
        });
        return next.handle(modifiedRequest);


      })
    );
  }
}
