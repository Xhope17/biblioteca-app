import { Routes } from '@angular/router';
import { BibliotecaLayoutComponent } from './layouts/biblioteca-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
// import { HomeComponent } from './pages/home/home.component';
// import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: BibliotecaLayoutComponent,
    children: [
      { path: '', component: HomePageComponent }, // Página de Inicio por defecto
      { path: 'login', component: LoginPageComponent },

      // Aquí agregaremos luego los demás:
      { path: 'libros', component: BooksPageComponent },
      // { path: 'usuarios', loadComponent: ... }
    ]
  },
  { path: '**', redirectTo: '' } // Si escriben cualquier cosa, van al home
];
