import { Component, inject } from '@angular/core';
import { LoginServiceService } from '../../services/login.service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-privado',
  standalone: true,
  imports: [],
  templateUrl: './privado.component.html',
  styleUrl: './privado.component.css',
})
export class PrivadoComponent {
  loginservice = inject(LoginServiceService);
  toastrService = inject(ToastrService);
  name: string = '';
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
}
