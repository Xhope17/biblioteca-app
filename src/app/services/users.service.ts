import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Usuarios`);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Usuarios/${id}`);
  }

  // --- NUEVO MÉTODO ---
  createUsuario(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/Usuarios`, user);
  }
}
