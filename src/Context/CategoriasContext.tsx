import { Categoria, CategoriasContextType } from "../types/tipos";
import React, { createContext, useState } from "react";
import { categoriasIniciales } from "../data/categorias";

export const CategoriasContext = createContext<CategoriasContextType | undefined>(undefined);

export const CategoriasProvider = ({ children }: { children: React.ReactNode }) => {
  const [categorias, setCategoria] = useState<Categoria[]>(categoriasIniciales);

  const agregarCategoria = (categoria: Categoria) => {
    setCategoria((prev) => [...prev, categoria]);
  };

  const actualizarCategoria = (categoria: Categoria) => {
    setCategoria((prev) => prev.map((c) => (c.id === categoria.id ? categoria : c)));
  };

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        agregarCategoria,
        actualizarCategoria,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};
