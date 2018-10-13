import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const urlServidor = 'http://localhost:3000/api/establecimiento'; // en caso de couchdb

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  listar() {
    return this.http.get<any>(`${urlServidor}`).toPromise()
  }

  deshabilitar(id) {
    return this.http.delete<any>(`${urlServidor}/${id}`).toPromise()
  }

  habilitar(idEstablecimientoEducativo) {
    const params = {
      idEstablecimientoEducativo
    }
    return this.http.post<any>(`${urlServidor}/habilitar`, JSON.stringify(params)).toPromise()
  }

}
