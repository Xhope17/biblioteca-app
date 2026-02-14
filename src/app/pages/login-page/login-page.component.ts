import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Definimos el formulario con validaciones
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  errorMessage: string = '';
  isLoading: boolean = false;

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    // Extraemos los valores del formulario
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        // Si el login es exitoso, redirigimos al Home
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        // Si falla, mostramos el error
        this.isLoading = false;
        console.error('Error login:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}
