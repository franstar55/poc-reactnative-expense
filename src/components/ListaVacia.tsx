import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PropsLista } from "../types/tipos";

//si existe otro titulo y mensaje lo utiliza x las props, para reutilizar codigo es
//sino pone el mensaje que esta aca

const ListaVacia = ({ titulo, mensaje }: PropsLista) => {
  return (
    <View>
      <Text style={styles.titulo}>{titulo || "Todavía no hay movimientos"}</Text>
      <Text style={styles.mensaje}>
        {mensaje || "Agrega un nuevo movimiento para verlo en tu lista"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    padding: 5,
  },
  mensaje: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
});
export default ListaVacia;
