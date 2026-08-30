export type Categoria = {
  id: string;
  nombre: string;
  tipo: "ingreso" | "gasto";
  imagen: string;
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

//array de transacciones
//una funcion que recibe (transaccion objeto) y no devuelve nada (void)
export type TransaccionesContextType = {
  transacciones: Transaccion[];
  agregarTransaccion: (transaccion: Transaccion) => void;
};
