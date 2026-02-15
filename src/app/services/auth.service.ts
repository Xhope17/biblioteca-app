import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../interfaces/user.interface'; // Asegúrate de tener esta interfaz

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.baseUrl; // 'https://localhost:5087/api'
  private tokenKey = 'token';
  private userKey = 'user_data'; // Guardaremos rol y ID aquí

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // LOGIN
  login(credentials: { username: string; password: string }) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/Auth/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem(this.tokenKey, response.token);

            const userData = {
              username: response.username,
              role: response.role,
              idBibliotecario: response.idBibliotecario,
            };
            localStorage.setItem(this.userKey, JSON.stringify(userData));
          }
        }),
      );
  }


  //logout

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  // obtener datos guardados

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // datos del usuario rol, ID, Nombre
  getUserData() {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }

  // Helper específico para saber si es admin
  isAdmin(): boolean {
    const user = this.getUserData();
    return user?.role === 'Bibliotecario';
  }
}
