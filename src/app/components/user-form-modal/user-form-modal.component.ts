import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form-modal.component.html',
})
export class UserFormModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);

  @Output() userCreated = new EventEmitter<void>();

  userForm: FormGroup;
  isLoading = false;

  // Variables de Estado
  isEditing = false;
  userIdToEdit: number | null = null; // id del usuario
  showPassword = false;

  constructor() {
    this.userForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(10)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      idRol: [2, Validators.required],
      password: [''],
    });
  }

  ngOnInit() {
    this.userForm.get('idRol')?.valueChanges.subscribe((val) => {
      this.actualizarPassword(Number(val));
    });
  }

  open(user?: User) {
    const modal = document.getElementById(
      'modal_create_user',
    ) as HTMLDialogElement;

    if (user) {
      // MODO EDICIÓN
      this.isEditing = true;
      this.userIdToEdit = user.idUsuario!;

      this.userForm.patchValue({
        cedula: user.cedula,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        idRol: user.idRol,
        password: '', // se limpia el password visualmente
      });

      // Ejecutamos la lógica para mostrar u ocultar según el rol que tenga el usuario
      this.actualizarPassword(Number(user.idRol));
    } else {
      // modo registro
      this.isEditing = false;
      this.userIdToEdit = null;
      this.userForm.reset({ idRol: 2, password: '' });

      // para cliente se oculta el campo password
      this.actualizarPassword(2);
    }

    if (modal) modal.showModal();
  }

  close() {
    const modal = document.getElementById(
      'modal_create_user',
    ) as HTMLDialogElement;
    if (modal) modal.close();
  }

  actualizarPassword(rolId: number) {
    const passControl = this.userForm.get('password');

    //Si es bibliotecario
    if (rolId === 1) {
      this.showPassword = true;
      passControl?.enable();

      //al editar la contraseña es opcional
      if (this.isEditing) {
        passControl?.clearValidators();
      } else {
        // Si estamos registrando, la contraseña es obligatoria
        passControl?.setValidators([
          Validators.required,
          Validators.minLength(6),
        ]);
      }
    } else {
      // si es cliente
      this.showPassword = false;
      passControl?.clearValidators();
      passControl?.setValue('');
      passControl?.disable();
    }

    passControl?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // obtenemos los datos incluso si hay campos deshabilitados
    const userData = this.userForm.getRawValue();

    // Aseguramos que el rol sea un numero
    userData.idRol = Number(userData.idRol);

    if (this.isEditing && this.userIdToEdit) {
      // modo edición
      const userToUpdate = { ...userData, idUsuario: this.userIdToEdit };

      // Si el password está vacío porque no se lo tocó, lo eliminamos del objeto para enviar un null limpio
      if (!userData.password) {
        delete userToUpdate.password;
      }

      this.usersService
        .updateUsuario(this.userIdToEdit, userToUpdate)
        .subscribe({
          next: () => {
            alert('✅ Usuario actualizado correctamente');
            this.finalizarAccion();
          },
          error: (err) => this.manejarError(err),
        });
    } else {
      // --- MODO CREACIÓN (POST) ---
      this.usersService.createUsuario(userData).subscribe({
        next: () => {
          alert('Usuario creado exitosamente');
          this.finalizarAccion();
        },
        error: (err) => this.manejarError(err),
      });
    }
  }

  // Helpers para no repetir código
  finalizarAccion() {
    this.isLoading = false;
    this.userCreated.emit();
    this.close();
  }

  manejarError(err: any) {
    console.error(err);
    alert('❌ Error: ' + (err.error?.mensaje || 'Operación fallida'));
    this.isLoading = false;
  }
}
