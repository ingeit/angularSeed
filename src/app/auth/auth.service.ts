import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const urlServidor = 'http://ingeit.ddns.net/couchdb/angular_seed'; // en caso de couchdb

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {
  }

  register(usuario) {
    return this.buscarCoincidencias(usuario)
      .then(() => {
        return this.insertar(usuario)
      })
  }

  buscarCoincidencias(usuario) {
    let find: any;
    find = {
      selector: {
        $or: [
          { email: usuario.email },
          { username: usuario.username }
        ]
      }
    };
    return this.http.post(`${urlServidor}/_find/`, JSON.stringify(find), httpOptions).toPromise()
      .then((res: any) => {
        if (res.docs.length !== 0) {
          // el mail o el usuario esta en uso
          res.docs.forEach(res => {
            if (res.email === usuario.email) {
              return Promise.reject('El email ya se encuentra en uso');
            } else {
              return Promise.reject('El nombre de usuario ya se encuentra en uso');
            }
          });
        }
        // no existen coincidencias en email o username
        return Promise.resolve();
      });
  }

  insertar(usuario) {
    usuario.clase = 'usuario';
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