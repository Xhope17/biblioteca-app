import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PrestamosService {

  private api = 'http://localhost:5087/api/Prestamos';

  constructor(private http: HttpClient) {}

  getPrestamos() {
    return this.http.get<any[]>(this.api);
  }
}
