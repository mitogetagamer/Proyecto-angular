import { Routes } from '@angular/router';
import { activateGuard } from './guards/activate.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';

export const routes: Routes = [
  { path: 'inicio', title: 'Inicio', component: InicioComponent },
  { path: 'productos', title: 'Productos', component: ProductosComponent },
  { path: 'servicios', title: 'Servicios', component: ServiciosComponent },
  { path: 'nosotros', title: 'Nosotros', component: NosotrosComponent },
  { path: 'contacto', title: 'Contacto', component: ContactoComponent },
  {
    path: 'registrarse',
    title: 'Registrarse',
    component: RegistrarseComponent,
  },
  { path: 'login', title: 'Login', component: IniciarSesionComponent },
  {
    path: 'privado',
    title: 'Privado',
    component: PrivadoComponent,
    canActivate: [activateGuard],
  },
  { path: 'navegacion', title: 'Navegación', component: NavegacionComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: '**',
    component: NoEncontradoComponent,
    title: 'Error, la pagina solicitada no existe',
  },
];
