import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegistrarseService } from '../../services/registrarse.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css',
})
export class RegistrarseComponent {
  registrarseservice = inject(RegistrarseService);
  nombre: String = '';
  email: String = '';
  contrasenia: String = '';

  handleSubmit() {
    if (this.email) {
      this.registrarseservice
        .crearUsuario(this.nombre, this.email, this.contrasenia)
        .subscribe((response: any) => {
          console.log('response: ', response);
        });
    } else {
      console.log('mal');
    }
  }
}
