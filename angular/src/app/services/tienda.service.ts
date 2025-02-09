import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private API_URL = 'http://localhost:3000/Lanzamientos/';

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

  editarMapcakes(
    id: string,
    nombre: string,
    precio: number,
    descripcion: string
  ): Observable<any> {
    const payload = { nombre, precio, descripcion };
    return this.httpClient.put(`${this.API_URL}/${id}`, payload);
  }
}
