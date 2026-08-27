import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PropsTransaccionItem } from "../types/tipos";
import { categorias } from "../data/categorias";

//el archivo recibe una transacciónItem y decide cómo mostrarla

//TransaccionItem recibe una prop llamada item
const TransaccionItem = ({ item }: PropsTransaccionItem) => {

  const categoria = categorias.find(
    (categoria) => categoria.id === item.categoriaId
  );

  return (
    <View style={styles.card}>
      <View style={styles.filaSuperior}>
        <Text style={styles.categoria}>{categoria?.imagen} {categoria?.nombre}</Text>
        <Text style={styles.monto}>${item.monto.toLocaleString("es-AR")}</Text>
      </View>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <Text style={styles.fecha}>{item.fecha}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  filaSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  categoria: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  monto: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descripcion: {
    fontSize: 14,
    color: "#333",
  },
  fecha: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});

export default TransaccionItem;