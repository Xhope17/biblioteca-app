import { Routes } from '@angular/router';
import { BibliotecaLayoutComponent } from './layouts/biblioteca-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { LoansPageComponent } from './pages/loans-page-component/loans-page.component';

export const routes: Routes = [
  {
    path: '',
    component: BibliotecaLayoutComponent,
    children: [
      { path: '', component: HomePageComponent }, // página de Inicio
      { path: 'login', component: LoginPageComponent },

      { path: 'libros', component: BooksPageComponent },
      { path: 'usuarios', component: UsersPageComponent },
      { path: 'prestamos', component: LoansPageComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
