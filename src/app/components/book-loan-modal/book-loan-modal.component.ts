import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { LoansService } from '../../services/loans.service';
import { Book } from '../../interfaces/book.interface';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'book-loan-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-loan-modal.component.html',
})
export class BookLoanModalComponent {
  private usuariosService = inject(UsersService);
  private prestamosService = inject(LoansService);
  private authService = inject(AuthService);

  @Output() loanConfirmed = new EventEmitter<void>();

  // Variables
  libro: Book | null = null;

  // DOS LISTAS: Una completa (backup) y una para mostrar (filtrada)
  allUsuarios: User[] = [];
  usuariosMostrados: User[] = [];

  idUsuarioSeleccionado: number | null = null;
  textoFiltro: string = '';
  isLoading = false;

  open(libroRecibido: Book) {
    this.libro = libroRecibido;
    this.idUsuarioSeleccionado = null;
    this.textoFiltro = '';
    this.cargarUsuarios();

    const modal = document.getElementById(
      'modal_prestamo_component',
    ) as HTMLDialogElement;
    if (modal) modal.showModal();
  }

  close() {
    const modal = document.getElementById(
      'modal_prestamo_component',
    ) as HTMLDialogElement;
    if (modal) modal.close();
  }

  cargarUsuarios() {
    // Si ya tenemos datos, solo reseteamos el filtro
    if (this.allUsuarios.length > 0) {
      this.usuariosMostrados = this.allUsuarios;
      return;
    }

    // Si no, cargamos de la API
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.allUsuarios = data;
      this.usuariosMostrados = data;
    });
  }

  // FILTRA LA LISTA DEL SELECT
  filtrarUsuarios() {
    const termino = this.textoFiltro.toLowerCase();

    this.usuariosMostrados = this.allUsuarios.filter(
      (u) =>
        u.nombre.toLowerCase().includes(termino) ||
        u.apellido.toLowerCase().includes(termino) ||
        u.cedula.includes(termino),
    );
  }

  confirmar() {
    if (!this.libro || !this.idUsuarioSeleccionado) return;

    this.isLoading = true;
    const adminData = this.authService.getUserData();

    if (!adminData || !adminData.idBibliotecario) {
      alert('Error de sesión');
      this.isLoading = false;
      return;
    }

    const prestamoDto = {
      idLibro: this.libro.idLibro,
      idUsuario: Number(this.idUsuarioSeleccionado),
      idBibliotecario: Number(adminData.idBibliotecario),
    };

    this.prestamosService.registrarPrestamo(prestamoDto).subscribe({
      next: () => {
        alert('✅ Préstamo registrado correctamente');
        this.isLoading = false;
        this.loanConfirmed.emit();
        this.close();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error: ' + (err.error?.mensaje || 'Error desconocido'));
        this.isLoading = false;
      },
    });
  }
}
