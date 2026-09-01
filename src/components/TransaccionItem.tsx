import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { PropsTransaccionItem } from "../types/tipos";
import { categorias } from "../data/categorias";
import { useNavigation } from "@react-navigation/native";

//el archivo recibe una transacciónItem y decide cómo mostrarla

//TransaccionItem recibe una prop llamada item
const TransaccionItem = ({ item }: PropsTransaccionItem) => {
  const categoria = categorias.find((categoria) => categoria.id === item.categoriaId);
  const esIngreso = item.tipoMovimiento === "ingreso";
  const navigation = useNavigation<any>();

  return (
    <View style={styles.card}>
      <View style={styles.dataPrincipal}>
        <Text style={styles.categoria}>
          {categoria?.imagen} {categoria?.nombre}
        </Text>
        <Text style={[styles.monto, { color: esIngreso ? "#00c106" : "#dd0400" }]}>
          {esIngreso ? "+" : "-"} ${item.monto.toLocaleString("es-AR")}
        </Text>
      </View>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <View style={styles.barraInferior}>
        <Text style={styles.fecha}>{item.fecha}</Text>
        <Pressable
          style={styles.edbutton}
          onPress={() => navigation.navigate("Agregar", { transaccion: item })}>
          <Text>Editar</Text>
        </Pressable>
      </View>
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
  dataPrincipal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  barraInferior: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  edbutton: {
    backgroundColor: "#95ffda",
    color: "#000",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});

export default TransaccionItem;
