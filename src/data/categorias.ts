import { Categoria } from "../types/tipos";

export const categorias: Categoria[] = [
    {
        id: "comida",
        nombre: "Comida",
        tipo: "gasto",
        imagen: "🍔",
    },
    {
        id: "transporte",
        nombre: "Transporte",
        tipo: "gasto",
        imagen: "🚗",
    },
    {
        id: "salud",
        nombre: "Salud",
        tipo: "gasto",
        imagen: "💊",
    },
    {
        id: "sueldo",
        nombre: "Sueldo",
        tipo: "ingreso",
        imagen: "💰",
    },
    {
        id: "inversion",
        nombre: "Inversión",
        tipo: "ingreso",
        imagen: "📈",
    },
    {
        id: "trabajo-extra",
        nombre: "Trabajo extra",
        tipo: "ingreso",
        imagen: "💼",
    },
    {
        id: "ocio",
        nombre: "Ocio",
        tipo: "gasto",
        imagen: "🎭",
    },
];