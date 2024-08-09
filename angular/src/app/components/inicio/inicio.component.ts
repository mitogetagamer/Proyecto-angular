import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InicioService } from '../../services/inicio.service';
import { NavegacionComponent } from '../navegacion/navegacion.component';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, CommonModule, NavegacionComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  inicioService = inject(InicioService);

  Datos: any[] = [];

  obtenerMapcakes() {
    this.inicioService.obtenerDatos().subscribe((respuesta: any) => {
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
