import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Book } from '../interfaces/book.interface'; // Asegúrate de tener esta interfaz creada
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getLibros(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/Libros`);
  }
}
