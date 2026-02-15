import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Loan } from '../interfaces/loan.inteface';

@Injectable({ providedIn: 'root' })
export class LoansService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  registrarPrestamo(prestamo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Prestamos`, prestamo);
  }

  // --- NUEVOS MÉTODOS ---

  // Obtener historial completo
  getPrestamos(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/Prestamos`);
  }

  // Marcar como devuelto (Backend debe poner FechaDevolucion = DateTime.Now)
  devolverLibro(idPrestamo: number): Observable<any> {
    // Usualmente es un PUT o POST a una ruta específica
    return this.http.put(`${this.baseUrl}/Prestamos/devolver/${idPrestamo}`, {});
  }
}
