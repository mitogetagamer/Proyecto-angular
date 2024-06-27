import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  httpClient = inject(HttpClient);
  constructor() {}
  API_URL = 'http://localhost:2000/Lanzamientos/';

  crearMapcake(
    nombre: any,
    sabor: any,
    precio: any,
    imagen: File,
    descripcion: any
  ) {
    const formdata = new FormData();
    formdata.append('nombre', nombre);
    formdata.append('sabor', sabor);
    formdata.append('precio', precio);
    formdata.append('imagen', imagen);
    formdata.append('descripcion', descripcion);
    return this.httpClient.post(this.API_URL, formdata);
  }
  getMapcakes() {
    return this.httpClient.get(this.API_URL);
  }
  deleteMapcakes(id: string) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
  editarMapcakes(nombre: any, precio: any, descripcion: any, id: string) {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    return this.httpClient.put(this.API_URL, formData + '/' + `${id}`);
  }
}
