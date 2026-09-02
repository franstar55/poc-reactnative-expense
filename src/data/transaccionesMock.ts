import { Transaccion } from "../types/tipos";

export const transaccionesIniciales: Transaccion[] = [
  { id: "mock-1", tipoMovimiento: "ingreso", monto: 1200000, categoriaId: "sueldo", descripcion: "Sueldo mensual", fecha: "2026-07-01" },
  { id: "mock-2", tipoMovimiento: "gasto", monto: 180500, categoriaId: "comida", descripcion: "Supermercado mensual", fecha: "2026-07-02" },
  { id: "mock-3", tipoMovimiento: "gasto", monto: 42000, categoriaId: "transporte", descripcion: "Carga de combustible", fecha: "2026-07-03" },
  { id: "mock-4", tipoMovimiento: "ingreso", monto: 350000, categoriaId: "trabajo-extra", descripcion: "Servicios de diseño", fecha: "2026-07-04" },
  { id: "mock-5", tipoMovimiento: "gasto", monto: 98000, categoriaId: "ocio", descripcion: "Salida a cenar", fecha: "2026-07-05" },
  { id: "mock-100", tipoMovimiento: "gasto", monto: 82000, categoriaId: "comida", descripcion: "Compras supermercado y verduras", fecha: "2026-10-10" },
];
