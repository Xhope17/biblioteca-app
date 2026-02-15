export interface Loan {
  idPrestamo: number;
  fechaPrestamo: string;
  fechaDevolucion?: string | null; // Si es null, sigue prestado
  idLibro: number;
  idUsuario: number;

  // Datos anidados que vienen del Include() en el Backend
  libro?: {
    titulo: string;
    imagenUrl?: string;
    autor?: string;
  };
  usuario?: {
    nombre: string;
    apellido: string;
    cedula: string;
  };
}
