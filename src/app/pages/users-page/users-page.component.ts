import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent implements OnInit {
  private usersService = inject(UsersService);
  public authService = inject(AuthService); // Public para usarlo en el HTML

  users: User[] = [];
  loading = true;

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    this.usersService.getUsuarios().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  eliminarUsuario(user: User) {
    // Confirmación simple de JS
    const confirmacion = confirm(`¿Estás seguro de eliminar a ${user.nombre} ${user.apellido}?`);

    if (!confirmacion || !user.idUsuario) return;

    this.usersService.deleteUsuario(user.idUsuario).subscribe({
      next: () => {
        alert('Usuario eliminado');
        this.cargarUsuarios(); // Recargamos la tabla
      },
      error: (err) => alert('Error al eliminar: ' + err.message)
    });
  }
}
