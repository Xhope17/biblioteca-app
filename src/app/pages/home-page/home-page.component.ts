import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book.interface';
import { LibrosService } from '../../services/libros.service';
import { RouterLinkActive, RouterModule } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  private librosService = inject(LibrosService);
  libros: Book[] = [];
  authService = inject(AuthService);

  ngOnInit() {
    this.librosService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: (err) => console.error('Error al cargar libros', err),
    });
  }
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get username(): string | null {
    return this.authService.getUserData().username || null;
  }
  
}
