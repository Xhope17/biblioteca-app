import { Routes } from '@angular/router';
import { BibliotecaLayoutComponent } from './layouts/biblioteca-layout.component';
// import { HomeComponent } from './pages/home/home.component';
// import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: BibliotecaLayoutComponent,
    // children: [
    //   { path: '', component: HomeComponent }, // Página de Inicio por defecto
    //   { path: 'login', component: LoginComponent },

      // Aquí agregaremos luego los demás:
      // { path: 'libros', component: LibrosComponent },
      // { path: 'usuarios', loadComponent: ... }
    // ]
  },
  { path: '**', redirectTo: '' } // Si escriben cualquier cosa, van al home
];
