import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const urlServidor = 'http://localhost:3000/api/auth'; // en caso de couchdb

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  login(credenciales) {
    console.log('TCL: AuthService -> login -> credenciales', credenciales);
    return this.http.post<any>(`${urlServidor}/login`, JSON.stringify(credenciales), httpOptions).toPromise()
      .then(res => {
        console.log('TCL: AuthService -> login -> res', res);
        this.clearLocalStorage();
        localStorage.setItem('idUsuario', res.respuesta[0].idUsuario);
        localStorage.setItem('username', res.respuesta[0].username);
        localStorage.setItem('rol', res.respuesta[0].rol);
        localStorage.setItem('token', res.respuesta[0].token);
        localStorage.setItem('loggedIn', 'true');
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log('TCL: AuthService -> login -> err', err);
        localStorage.setItem('loggedIn', 'false');
        return Promise.reject(err);
      })
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
    // usuario.password = md5(usuario.password);
    console.log('TCL: AuthService -> registrar -> usuario', usuario);
    return this.http.post(`${urlServidor}/`, JSON.stringify(usuario)).toPromise()
  }



  logout(): void {
    console.log("logout")
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }

  clearLocalStorage() {
    localStorage.clear();
    localStorage.setItem('loggedIn', 'false')
  }
}