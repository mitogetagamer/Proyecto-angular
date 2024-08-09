import { Component } from '@angular/core';
import { NavegacionComponent } from '../navegacion/navegacion.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [NavegacionComponent, RouterLink],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css',
})
export class NosotrosComponent {}
