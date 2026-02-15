import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../../services/libros.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../interfaces/book.interface';
import { BookLoanModalComponent } from '../../components/book-loan-modal/book-loan-modal.component';
import { BooksRegisterModalComponent } from '../../components/books-register-modal/books-register-modal.component';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [CommonModule, BookLoanModalComponent, BooksRegisterModalComponent],
  templateUrl: './books-page.component.html',
})
export class BooksPageComponent implements OnInit {
  // registrar libro nuevo
  @ViewChild(BooksRegisterModalComponent)
  modalRegister!: BooksRegisterModalComponent;

  // Registrar préstamo
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
      error: () => (this.loading = false),
    });
  }

  abrirModal(book: Book) {
    this.modal.open(book);
  }

  abrirModalRegistro() {
    this.modalRegister.open();
  }
}
