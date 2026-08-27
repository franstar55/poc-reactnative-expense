import React, { createContext, useState } from "react";
import { Transaccion, TransaccionesContextType } from "../types/tipos";

//archivo que permite tener la info centralizada y q todas las pantallas puedan acceder a las transacciones 

export const TransaccionesContext =
    createContext<TransaccionesContextType | undefined> (undefined); //crea context que puede ser d esos 2 tipos pero empieza siendo undefined

//el Provider es el que entrega el Context a las pantallas que están adentro de el, children significa: todo lo que pongamos dentro del provider
export const TransaccionesProvider = ({ children }: { children: React.ReactNode }) => {

    const [transacciones, setTransacciones] =
        useState <Transaccion[]> ([]);
        {/*crea el estado de las transacciones*/}

    const agregarTransaccion = (transaccion: Transaccion) => {
        setTransacciones((prev) => [...prev, transaccion]);
        {/* [...prev, transaccion] dame el estado anterior más reciente y agregale esta transacción, para evitar bugs si hay actualizaciones que  casi al mismo tiempo (por ej, dos agregarTransaccion seguidos antes de que react vuelva a renderizar)*/}
        {/*setTransacciones guarda ese nuevo array*/}
    };

    return (
        <TransaccionesContext.Provider
            value={{
                transacciones,
                agregarTransaccion           
            }}
        >
            {children}
        </TransaccionesContext.Provider>
    );
};

//TransaccionesContext.Provider
//a las cosas que estén dentro de este Provider les entrega esas dos cosas