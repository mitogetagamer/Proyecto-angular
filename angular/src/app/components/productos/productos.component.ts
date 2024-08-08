import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TiendaService } from '../../services/tienda.service';
import { CurrencyPipe } from '@angular/common';
import { NavegacionComponent } from '../navegacion/navegacion.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    ReactiveFormsModule,
    NavegacionComponent,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  toastservide = inject(ToastrService);
  tiendaservice = inject(TiendaService);
  myValue: string = '';
  nombre: String = '';
  sabor: String = '';
  descripcion: String = '';
  imagen: File | null = null;
  precio: Number = 0;

  cpks: any[] = [];
  allcpks: any[] = [];
  cpkselected: any = null;

  inputFile(event: any) {
    console.log('evento: ', event);
    if (event.target.files && event.target.files[0]) {
      this.imagen = event.target.files[0];
      console.log(this.imagen);
    }
  }

  ngOnInit() {
    this.tiendaservice.getMapcakes().subscribe((res: any) => {
      if (res.resultado === 'bien') {
        this.cpks = res.datos;
        console.log(this.cpks);
      } else {
        this.toastservide.error('An error ocurred');
      }
    });
    this.myValue = 'Nuevo texto desde OnInit';
  }
  handleDelete(id: string) {
    this.tiendaservice.deleteMapcakes(id).subscribe((res: any) => {
      if (res.resultado === 'bien') {
        this.toastservide.success('El mapcake fue eliminado con exito');
      } else {
        this.toastservide.error('Ah ocurrido un error al elimianr el mapcake');
      }
    });
    return true;
  }

  handleUpdate(cpk: any) {
    console.log('cpk: ', cpk);
    this.cpkselected = { cpk };
    console.log('cpk selected: ', this.cpkselected);
  }
  handleSubmit() {
    if (this.imagen) {
      this.tiendaservice
        .crearMapcake(
          this.nombre,
          this.sabor,
          this.precio,
          this.imagen,
          this.descripcion
        )
        .subscribe((response: any) => {
          console.log('response: ', response);
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
  handleActualizar() {
    if (this.cpkselected && this.cpkselected.cpk) {
      const id = this.cpkselected.cpk._id;
      const nombre = this.cpkselected.cpk.nombre;
      const descripcion = this.cpkselected.cpk.descripcion;
      const precio = this.cpkselected.cpk.precio;

      this.tiendaservice
        .editarMapcakes(id, nombre, precio, descripcion)
        .subscribe((response: any) => {
          console.log(
            'nombre: ',
            this.nombre,
            'descricpicoon: ',
            this.descripcion,
            'precio: ',
            this.precio
          );
          console.log('response: ', response);
          if (response.resultado === 'bien') {
            this.toastservide.success('El mapcake fue actualizado con exito');
          } else {
            this.toastservide.error('Ocurrio un error');
          }
        });
    }
  }
}

// if (
//   this.nombre === '' ||
//   this.descripcion === '' ||
//   this.precio === undefined
// ) {
//   this.toastservide.warning('todos los campos son requeridos');
// } else {
// }
// this.tiendaservice
//   .editarMapcakes(this.nombre, this.descripcion, this.precio)
//   .subscribe((response: any) => {
//     console.log(this.nombre);
//   });
