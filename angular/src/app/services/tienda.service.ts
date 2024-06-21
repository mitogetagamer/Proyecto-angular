import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  httpClient = inject(HttpClient);
  constructor() {}
  API_URL = 'localhost:2000/Lanzamientos/';

  crearMapcake(nombre: any, sabor: any, precio: any, imagen: File) {
    const formdata = new FormData();
    formdata.append('nombre', nombre);
    formdata.append('sabor', sabor);
    formdata.append('precio', precio);
    formdata.append('imagen', imagen);
    return this.httpClient.post(this.API_URL, formdata);
  }
  getMapcakes() {
    return this.httpClient.get(this.API_URL);
  }
}
