export interface Loan {
  idPrestamo?: number;
  idUsuario: number;       // Cliente
  idLibro: number;         // Libro
  idBibliotecario: number; // Quién lo presta
  cliente?: string;        // Solo para mostrar en tabla
  libro?: string;          // Solo para mostrar en tabla
  fechaPrestamo?: Date;
  fechaDevolucion?: Date;
  estado?: string;
}
