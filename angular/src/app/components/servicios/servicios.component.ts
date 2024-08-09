import { Component, inject } from '@angular/core';
import { InicioService } from '../../services/inicio.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavegacionComponent } from '../navegacion/navegacion.component';
@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, CommonModule, NavegacionComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})
export class ServiciosComponent {
  InicioService = inject(InicioService);
  Datos: any[] = [];

  obtenerMapcakes() {
    this.InicioService.obtenerDatos().subscribe((respuesta: any) => {
      console.log('respuesta', respuesta);
      if (respuesta.datos) {
        this.Datos = respuesta.datos;
        console.log('bien');
      } else {
        console.log('error');
      }
    });
  }
  ngOnInit() {
    this.obtenerMapcakes();
  }
}
