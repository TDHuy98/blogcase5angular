import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Injectable } from '@angular/core';
import {JwtAutResponse} from "./auth/jwt-aut-response";
import {AuthService} from "./auth/auth.service";

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private localStoraqeService: LocalStorageService,
              private sessionStorage: SessionStorageService,
              private authService: AuthService
              ) {

  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getAuthToken();
    console.log('jwt token ' + token);
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + token),
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
