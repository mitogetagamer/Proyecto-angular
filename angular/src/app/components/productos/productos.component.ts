import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TiendaService } from '../../services/tienda.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, ReactiveFormsModule],
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
  }
  handleUpdate(cpk: any) {
    console.log('cpk: ', cpk);
    this.cpkselected = { cpk };
    console.log('cpk selected: ', this.cpkselected);
  }
  handleActualizar() {
    if (this.nombre === '' || this.descripcion === '' || this.precio === 0) {
      console.log('nombre:  ', this.nombre);
      this.toastservide.error('error al actualizar');
    } else {
      this.tiendaservice
        .editarMapcakes(this.cpkselected.cpk.precio.nombre.descripcion)

        .subscribe((response: any) => {
          console.log(this.imagen);
          console.log(this.nombre);
          console.log(this.descripcion);
          console.log(this.precio);
          console.log('response: ', response);
          if (response.resultado === 'bien') {
            this.toastservide.success('ahora sii');
          } else {
            this.toastservide.error('aún no');
          }
        });
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
  }
}
