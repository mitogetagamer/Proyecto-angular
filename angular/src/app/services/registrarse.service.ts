import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RegistrarseService {
  constructor() {}
  httpClient = inject(HttpClient);
  API_URL = 'http://18.221.235.213:3000/usuarios';
  crearUsuario(nombre: any, email: any, contrasenia: any) {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('contrasenia', contrasenia);

    return this.httpClient.post(this.API_URL, { nombre, email, contrasenia });
  }
}
