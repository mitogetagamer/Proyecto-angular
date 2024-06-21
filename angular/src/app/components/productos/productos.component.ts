import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TiendaService } from '../../services/tienda.service';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  toastservide = inject(ToastrService);
  tiendaservice = inject(TiendaService);

  nombre: String = '';
  sabor: String = '';
  imagen: File | null = null;
  precio: Number = 0;

  cpks: any[] = [];

  inputFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imagen = event.target.files[0];
    }
  }
  handleSubmit() {
    if (this.imagen) {
      this.tiendaservice
        .crearMapcake(this.nombre, this.sabor, this.precio, this.imagen)
        .subscribe((response: any) => {
          if (response.resultado === 'bien') {
            this.toastservide.success('El mapcake fue creado con exito');
          } else {
            this.toastservide.error('Ocurrio un error');
          }
        });
    } else {
      this.toastservide.warning('Todos los campos son requeridos');
    }
  }
  ngOnInit() {
    this.tiendaservice.getMapcakes().subscribe((res: any) => {
      if (res.resultado === 'bien') {
        this.cpks = res.datos;
      } else {
        this.toastservide.error('An error ocurred');
      }
    });
  }
}
