import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para DatePipe y ngClass
import { LoansService } from '../../services/loans.service';
import { Loan } from '../../interfaces/loan.inteface';

@Component({
  selector: 'app-loans-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loans-page.component.html',
})
export class LoansPageComponent implements OnInit {
  private loansService = inject(LoansService);

  loans: Loan[] = [];
  loading = true;

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.loading = true;
    this.loansService.getPrestamos().subscribe({
      next: (data) => {
        // Opcional: Ordenar para que los pendientes salgan primero
        this.loans = data.sort((a, b) => {
          if (a.fechaDevolucion === null && b.fechaDevolucion !== null) return -1;
          if (a.fechaDevolucion !== null && b.fechaDevolucion === null) return 1;
          return new Date(b.fechaPrestamo).getTime() - new Date(a.fechaPrestamo).getTime();
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  devolverLibro(loan: Loan) {
    if (!confirm(`¿Confirmar devolución del libro "${loan.libro?.titulo}"?`)) return;

    this.loansService.devolverLibro(loan.idPrestamo).subscribe({
      next: () => {
        alert('✅ Libro devuelto correctamente');
        this.cargarPrestamos(); // Recargar la tabla para ver el cambio
      },
      error: (err) => alert('❌ Error al devolver: ' + (err.error?.mensaje || 'Error desconocido'))
    });
  }
}
