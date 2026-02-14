import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para usar *ngIf
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  authService = inject(AuthService); // Inyección moderna

  // Getters para usar en el HTML de forma limpia
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get username(): string | null {
    return this.authService.getUserData()?.username || null; // Asumiendo que agregaste este método, si no, usa getUserData().username
  }

  logout() {
    this.authService.logout();
  }
}
