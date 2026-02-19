import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { UserFormModalComponent } from '../../components/user-form-modal/user-form-modal.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, UserFormModalComponent],
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent implements OnInit {
  @ViewChild(UserFormModalComponent) modalUser!: UserFormModalComponent;

  private usersService = inject(UsersService);
  public authService = inject(AuthService);

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
      },
    });
  }

  eliminarUsuario(user: User) {
    // Confirmación simple de JS
    const confirmacion = confirm(
      `¿Estás seguro de eliminar a ${user.nombre} ${user.apellido}?`,
    );

    if (!confirmacion || !user.idUsuario) return;

    this.usersService.deleteUsuario(user.idUsuario).subscribe({
      next: () => {
        alert('Usuario eliminado');
        this.cargarUsuarios(); // Recargar la tabla
      },
      error: (err) => alert('Error al eliminar: ' + err.message),
    });
  }

  abrirModalNuevo() {
    this.modalUser.open();
  }
}
