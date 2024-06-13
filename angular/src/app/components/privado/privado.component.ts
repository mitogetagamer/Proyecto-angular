import { Component, inject } from '@angular/core';
import { LoginServiceService } from '../../services/login.service.service';

@Component({
  selector: 'app-privado',
  standalone: true,
  imports: [],
  templateUrl: './privado.component.html',
  styleUrl: './privado.component.css',
})
export class PrivadoComponent {
  loginservice = inject(LoginServiceService);

  nombre: string = '';
  ngOnInit() {
    const token: any = localStorage.getItem('token');
    console.log('token ', token);
    if (token) {
      this.loginservice.validateToken(token).subscribe((response: any) => {
        console.log('response: ', response);
        if (response.resultado === 'bien') {
          this.nombre = response.datos.name;
        } else {
          console.log('el token no es válido...');
        }
      });
    } else {
      console.log('el Token no existe');
    }
  }
}
