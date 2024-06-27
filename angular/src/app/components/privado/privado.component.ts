import { Component, inject } from '@angular/core';
import { LoginServiceService } from '../../services/login.service.service';
import { ToastrService } from 'ngx-toastr';
import { EnviosService } from '../../services/envios.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-privado',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './privado.component.html',
  styleUrl: './privado.component.css',
})
export class PrivadoComponent {
  loginservice = inject(LoginServiceService);
  toastrService = inject(ToastrService);
  enviosService = inject(EnviosService);
  name: string = '';
  nombreDeUsuario: string = '';
  direccion: string = '';
  direccion2: string = '';
  ciudad: string = '';
  ngOnInit() {
    const token: any = localStorage.getItem('token');
    console.log('token ', token);
    if (token) {
      this.loginservice.validateToken(token).subscribe((response: any) => {
        console.log('response: ', response);
        if (response.resultado === 'bien') {
          this.name = response.datos.name;
          this.toastrService.success(`hola, bienvenido!`);
        } else {
          //console.log('el token no es válido...');
          this.loginservice.logOut();
        }
      });
    } else {
      //console.log('el Token no existe');
      this.toastrService.info('Porfavor Inicie sesión');
      this.loginservice.logOut();
    }
  }
  handeleSubmit() {
    if (
      this.nombreDeUsuario === '' ||
      this.direccion === '' ||
      this.direccion2 === '' ||
      this.ciudad === ''
    ) {
      this.toastrService.warning('todos los campos son requeridos');
    } else {
      if (this.nombreDeUsuario) {
        this.enviosService
          .crearEnvio(
            this.nombreDeUsuario,
            this.direccion,
            this.direccion2,
            this.ciudad
          )

          .subscribe((response: any) => {
            this.toastrService.success('Pedido creado correctamente');
            console.log('response: ', response);
          });
      } else {
        console.log('mal');
        this.toastrService.error('error al crear pedido');
      }
    }
  }
}
