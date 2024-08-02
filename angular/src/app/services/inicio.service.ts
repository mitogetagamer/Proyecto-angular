import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class InicioService {
  constructor() {}
  httpClient = inject(HttpClient);
  API_URL: string = 'http://18.221.235.213:3000/Lanzamientos';

  obtenerDatos() {
    return this.httpClient.get(this.API_URL);
  }
}
