import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

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
  showPassword = false; // Variable para controlar visibilidad en HTML

  constructor() {
    this.userForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(10)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      idRol: [2, Validators.required], // 2 = Cliente por defecto
      password: [''] // Inicia sin validadores
    });
  }

  ngOnInit() {
    // Suscribirnos a cambios en el ROL
    this.userForm.get('idRol')?.valueChanges.subscribe((val) => {
      this.actualizarPassword(Number(val));
    });
  }

  open() {
    // Reseteamos el formulario al abrir
    this.userForm.reset({
      cedula: '',
      nombre: '',
      apellido: '',
      correo: '',
      idRol: 2, // Por defecto Cliente
      password: ''
    });

    this.actualizarPassword(2); // Aplicar lógica inicial

    const modal = document.getElementById('modal_create_user') as HTMLDialogElement;
    if (modal) modal.showModal();
  }

  close() {
    const modal = document.getElementById('modal_create_user') as HTMLDialogElement;
    if (modal) modal.close();
  }

  // --- LÓGICA MÁGICA ---
  actualizarPassword(rolId: number) {
    const passControl = this.userForm.get('password');

    if (rolId === 1) {
      // Si es BIBLIOTECARIO (1):
      this.showPassword = true;
      passControl?.setValidators([Validators.required, Validators.minLength(6)]);
      passControl?.enable();
    } else {
      // Si es CLIENTE (2):
      this.showPassword = false;
      passControl?.clearValidators();
      passControl?.setValue('');
      passControl?.disable(); // Lo deshabilitamos para que no estorbe
    }
    passControl?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // Al usar getRawValue() nos aseguramos de traer todo, aunque password esté disabled (si hiciera falta)
    // Pero como tu backend espera 'password?' opcional, usaremos .value que ignora los disabled.
    // Para bibliotecario SI lo envía, para cliente NO. Perfecto.
    const userData = this.userForm.value;
    userData.idRol = Number(userData.idRol);

    this.usersService.createUsuario(userData).subscribe({
      next: () => {
        alert('✅ Usuario registrado exitosamente');
        this.isLoading = false;
        this.userCreated.emit();
        this.close();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error: ' + (err.error?.mensaje || 'No se pudo crear el usuario'));
        this.isLoading = false;
      }
    });
  }
}
