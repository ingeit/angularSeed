import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(
    private message: NzMessageService,
    private authSrv: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('TCL: AuthHttpInterceptor -> req', req);
    // no debo setear el header authorization si me estoy logueando.. obviamente
    if (localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: { Authorization: localStorage.getItem('token') }
      });
    }

    req = req.clone({
      setHeaders: { 'Content-Type': 'application/json' }
    });

    return next.handle(req).pipe(
      tap(() => { }, err => {
        if (err.status === 401) {
          this.message.error('Sesion expirada. Ingrese al sistema por favor', { nzDuration: 5000 })
          this.authSrv.logout();
        }
      })
    )

  }
}