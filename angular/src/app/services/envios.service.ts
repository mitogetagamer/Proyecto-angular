import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EnviosService {
  httpClient = inject(HttpClient);
  API_URL = 'http://18.117.89.19:3000/envios';
  constructor() {}
  crearEnvio(
    nombreDeUsuario: any,
    direccion: any,
    direccion2: any,
    ciudad: any
  ) {
    const formData = new FormData();
    formData.append('nombreDeUsuario', nombreDeUsuario);
    formData.append('direccion', direccion);
    formData.append('direccion2', direccion2);
    formData.append('ciudad', ciudad);

    return this.httpClient.post(this.API_URL, {
      nombreDeUsuario,
      direccion,
      direccion2,
      ciudad,
    });
  }
}
