import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class LoansService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  // Envia ID de Usuario, Libro y Bibliotecario
  registrarPrestamo(prestamo: { idUsuario: number, idLibro: number, idBibliotecario: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/Prestamos`, prestamo);
  }
}
