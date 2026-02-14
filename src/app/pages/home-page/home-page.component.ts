import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book.interface';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  private librosService = inject(LibrosService);
  libros: Book[] = [];

  ngOnInit() {
    this.librosService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: (err) => console.error('Error al cargar libros', err),
    });
  }
}
