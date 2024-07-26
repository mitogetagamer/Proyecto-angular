import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../credenciales/credentials';
import { retry } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor() {}
  httpclient = inject(HttpClient);
  router = inject(Router);
  // se escribe a donde quiere que haga la petición

  API_URL = 'http://18.117.89.19:3000/inicio-sesion/';
  login(credential: Credential) {
    return this.httpclient.post(this.API_URL, credential);
  }
  validateToken(token: String) {
    return this.httpclient.get(`${this.API_URL}/${token}`);
  }

  isLogin() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
