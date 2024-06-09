import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../credenciales/credentials';
@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor() {}
  httpclient = inject(HttpClient);

  login(credential: Credential) {
    return this.httpclient.post(
      // se escribe a donde quiere que haga la petición
      'http://localhost:2000/inicio-sesion/',
      credential
    );
  }
}
