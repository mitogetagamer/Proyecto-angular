import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credential } from '../../credenciales/credentials';
import { LoginServiceService } from '../../services/login.service.service';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css',
})
export class IniciarSesionComponent {
  router = inject(Router);
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
         
          localStorage.setItem('token', response.datos);
          this.router.navigateByUrl('/privado');
        });
      } else {
        console.log('Error: invalid form');
      }
    }
  }
}
