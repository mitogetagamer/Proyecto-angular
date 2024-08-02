import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private API_URL = 'http://18.221.235.213:3000/Lanzamientos/';

  constructor(private httpClient: HttpClient) {}

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

  editarMapcakes(id: string, nombre: any, precio: any, descripcion: any) {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    const URL = `${this.API_URL}/${id}`;
    return this.httpClient.put(URL, formData);
  }
}
