import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginServiceService } from '../../services/login.service.service';
@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css',
})
export class NavegacionComponent {
  loginservice = inject(LoginServiceService);
}
