import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean;
  rol: string;
  idUsuario: number;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLoggedIn(url);
  }

  checkLoggedIn(url: string): boolean {
    this.isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));

    if (this.isLoggedIn) {
      return this.checkPermissionRol(url);
    }

    // Store the attempted URL for redirecting
    this.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

  checkPermissionRol(url) {
    this.rol = localStorage.getItem('rol');
    //eliminamos dashboard del string url
    const dir = url.split('/')[2];
    if (dir === 'establecimientos' && this.rol !== 'super') return false

    // en caso de no encontrar una regla que se cumpla, retorna true para poder continuar con la vista
    return true;
  }
}
