import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-books-register-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './books-register-modal.component.html',
})
export class BooksRegisterModalComponent {
  private fb = inject(FormBuilder);
  private librosService = inject(LibrosService);

  @Output() bookCreated = new EventEmitter<void>();

  bookForm: FormGroup;
  isLoading = false;

  constructor() {
    this.bookForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      autor: ['', Validators.required],
      stock: [1, [Validators.required, Validators.min(1)]],
      imagenUrl: [''] // Opcional
    });
  }

  // Getter para obtener la URL de la imagen en tiempo real
  get imagenPreview(): string {
    return this.bookForm.get('imagenUrl')?.value;
  }

  open() {
    this.bookForm.reset({ stock: 1 }); // Stock inicial en 1
    const modal = document.getElementById('modal_register_book') as HTMLDialogElement;
    if (modal) modal.showModal();
  }

  close() {
    const modal = document.getElementById('modal_register_book') as HTMLDialogElement;
    if (modal) modal.close();
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const bookData = this.bookForm.value;

    this.librosService.createLibro(bookData).subscribe({
      next: () => {
        alert('✅ Libro registrado exitosamente');
        this.isLoading = false;
        this.bookCreated.emit();
        this.close();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error: ' + (err.error?.mensaje || 'No se pudo guardar el libro'));
        this.isLoading = false;
      }
    });
  }
}
