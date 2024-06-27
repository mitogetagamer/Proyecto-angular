import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InicioService } from '../../services/inicio.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, CommonModule],
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
