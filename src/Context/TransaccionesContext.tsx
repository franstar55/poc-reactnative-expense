import React, { createContext, useState } from "react";
import { Transaccion, TransaccionesContextType } from "../types/tipos";
import { transaccionesIniciales } from "../data/transaccionesMock";

// archivo que permite tener la info centralizada y q todas las pantallas puedan acceder a las transacciones

export const TransaccionesContext = createContext<TransaccionesContextType | undefined>(undefined);

// el Provider es el que entrega el Context a las pantallas que están adentro de el, children significa: todo lo que pongamos dentro del provider
export const TransaccionesProvider = ({ children }: { children: React.ReactNode }) => {
  const [transacciones, setTransacciones] = useState<Transaccion[]>(transaccionesIniciales);

  const agregarTransaccion = (transaccion: Transaccion) => {
    // [...prev, transaccion] trae el estado anterior más reciente y agrega la nueva transacción,
    // para evitar bugs de renderizado y tratar al estado como inmutable.
    setTransacciones((prev) => [...prev, transaccion]);
  };

  const actualizarTransaccion = (transaccion: Transaccion) => {
    setTransacciones((prev) => prev.map((t) => (t.id === transaccion.id ? transaccion : t)));
  };

  return (
    <TransaccionesContext.Provider
      value={{
        transacciones,
        agregarTransaccion,
        actualizarTransaccion,
      }}
    >
      {children}
    </TransaccionesContext.Provider>
  );
};

//TransaccionesContext.Provider
//a las cosas que estén dentro de este Provider les entrega esas dos cosas
