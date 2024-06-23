import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class InicioService {
  constructor() {}
  httpClient = inject(HttpClient);
  API_URL: string = 'localhost:2000/Lanzamientos/';

  obtenerDatos() {
    return this.httpClient.get(this.API_URL);
  }
}
