import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Usuarios`);
  }
}
