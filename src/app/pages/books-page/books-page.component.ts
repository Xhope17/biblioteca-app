import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../../services/libros.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../interfaces/book.interface';
// IMPORTANTE: Importar el Modal hijo aquí
import { BookLoanModalComponent } from '../../components/book-loan-modal/book-loan-modal.component';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [CommonModule, BookLoanModalComponent], // <--- EL PADRE IMPORTA AL HIJO
  templateUrl: './books-page.component.html', // <--- APUNTA A SU PROPIO HTML
})
export class BooksPageComponent implements OnInit {
  // Referencia al hijo para poder abrirlo
  @ViewChild(BookLoanModalComponent) modal!: BookLoanModalComponent;

  private librosService = inject(LibrosService);
  private authService = inject(AuthService);

  books: Book[] = [];
  loading = true;

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.loading = true;
    this.librosService.getLibros().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  abrirModal(book: Book) {
    this.modal.open(book); // Llama al método open() del hijo
  }
}
