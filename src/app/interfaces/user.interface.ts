export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  idBibliotecario: number;
}

export interface User {
  idUsuario?: number; // Opcional porque al crear no lo tienes
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  idRol: number; // 1: Bibliotecario, 2: Cliente
  password?: string; // Solo se envía al crear bibliotecario
  nombreCompleto?: string; // Viene del Backend en el GET
  rol?: string; // Viene del Backend
}
