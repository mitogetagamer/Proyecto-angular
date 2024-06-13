import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../credenciales/credentials';
@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor() {}
  httpclient = inject(HttpClient);
  // se escribe a donde quiere que haga la petición

  API_URL = 'http://localhost:2000/inicio-sesion/';
  login(credential: Credential) {
    return this.httpclient.post(this.API_URL, credential);
  }
  validateToken(token: String) {
    return this.httpclient.get(`${this.API_URL}/${token}`);
  }
}
