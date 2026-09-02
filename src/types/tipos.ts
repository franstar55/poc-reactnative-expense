export type Categoria = {
  id: string;
  nombre: string;
  tipo: "ingreso" | "gasto";
  imagen: string;
};

export type CategoriasContextType = {
  categorias: Categoria[];
  agregarCategoria: (categoria: Categoria) => void;
  actualizarCategoria: (categoria: Categoria) => void;
};

export type TipoMovimiento = "gasto" | "ingreso";

export type Transaccion = {
  id: string;
  tipoMovimiento: TipoMovimiento;
  monto: number;
  categoriaId: string;
  descripcion: string;
  fecha: string; // formato: '2026-08-25'
};

export type PropsLista = {
  titulo?: string;
  mensaje?: string;
};

export type PropsTransaccionItem = {
  item: Transaccion;
};

export type TransaccionesContextType = {
  transacciones: Transaccion[];
  agregarTransaccion: (transaccion: Transaccion) => void;
  actualizarTransaccion: (transaccion: Transaccion) => void;
  eliminarTransaccion: (id: string) => void;
};
