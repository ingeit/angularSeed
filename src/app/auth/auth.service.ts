import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import * as md5 from 'md5';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const urlServidor = 'https://ingeit.ddns.net/couchdb/angular_seed'; // en caso de couchdb

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {
  }

  buscarCoincidencias(selector) {
    return new Promise((resolve, reject) => {
      const find = {
        selector
      };
      this.http.post(`${urlServidor}/_find/`, JSON.stringify(find), httpOptions).toPromise()
        .then((res: any) => {
          if (res.docs.length !== 0) {
            // el username esta en uso
            res.docs.forEach(res => {
              if (res.clase === 'usuario') {
                reject();
              }
            });
          }
          // no existen coincidencias en email o username
          resolve();
        });
    });
  }

  registrar(usuario) {
    usuario.clase = 'usuario';
    delete usuario.confirm;
    usuario.password = md5(usuario.password);
    console.log('TCL: AuthService -> registrar -> usuario', usuario);
    return this.http.post(`${urlServidor}/`, JSON.stringify(usuario), httpOptions).toPromise()
  }

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}