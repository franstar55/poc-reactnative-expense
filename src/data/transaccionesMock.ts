import { Transaccion } from "../types/tipos";

export const transaccionesIniciales: Transaccion[] = [
  {
    id: "mock-1",
    tipoMovimiento: "ingreso",
    monto: 1200000,
    categoriaId: "sueldo",
    descripcion: "Sueldo mensual",
    fecha: "2026-08-01",
  },
  {
    id: "mock-2",
    tipoMovimiento: "gasto",
    monto: 180500,
    categoriaId: "comida",
    descripcion: "Supermercado",
    fecha: "2026-08-10",
  },
  {
    id: "mock-3",
    tipoMovimiento: "gasto",
    monto: 42000,
    categoriaId: "transporte",
    descripcion: "Carga de transporte",
    fecha: "2026-08-15",
  },
  {
    id: "mock-4",
    tipoMovimiento: "ingreso",
    monto: 350000,
    categoriaId: "trabajo-extra",
    descripcion: "Trabajo freelance",
    fecha: "2026-08-20",
  },
  {
    id: "mock-5",
    tipoMovimiento: "gasto",
    monto: 98000,
    categoriaId: "ocio",
    descripcion: "Cena con amigos",
    fecha: "2026-08-25",
  },
];
