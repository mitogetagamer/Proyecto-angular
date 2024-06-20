import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credential } from '../../credenciales/credentials';
import { LoginServiceService } from '../../services/login.service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css',
})
export class IniciarSesionComponent {
  router = inject(Router);
  toastrService = inject(ToastrService);
  loginservice: LoginServiceService = inject(LoginServiceService);

  credentialsForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required),
  });

  handlesubmit() {
    if (this.credentialsForm.valid) {
      const nombre = this.credentialsForm.value.nombre;
      const contrasenia = this.credentialsForm.value.contrasenia;

      if (typeof nombre === 'string' && typeof contrasenia === 'string') {
        const credenciales: Credential = {
          nombre,
          contrasenia,
        };
        this.loginservice.login(credenciales).subscribe((response: any) => {
          if (response.resultado === 'bien') {
            localStorage.setItem('token', response.datos.token);
            this.router.navigateByUrl('/privado');
          } else {
            this.toastrService.warning('Invalid credentials');
          }
        });
      }
    } else {
      this.toastrService.warning('Todos los campos son necesarios');
    }
  }
}
