import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { PropsTransaccionItem } from "../types/tipos";
import { categoriasIniciales } from "../data/categorias";
import { CategoriasContext } from "../Context/CategoriasContext";
import { useNavigation } from "@react-navigation/native";
import { TransaccionesContext } from "../Context/TransaccionesContext";
import { Ionicons } from "@expo/vector-icons";

//el archivo recibe una transacciónItem y decide cómo mostrarla

//TransaccionItem recibe una prop llamada item
const TransaccionItem = ({ item }: PropsTransaccionItem) => {
  const categoriasCtx = useContext(CategoriasContext);
  const categorias = categoriasCtx?.categorias || categoriasIniciales;
  const categoria = categorias.find((c) => c.id === item.categoriaId);
  const esIngreso = categoria ? categoria.tipo === "ingreso" : item.tipoMovimiento === "ingreso";
  const navigation = useNavigation<any>();
  const context = useContext(TransaccionesContext);
  if (!context) {
    return <Text>Error: Context no disponible</Text>; 
  }
  const { eliminarTransaccion } = context;

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
        <View style={styles.botones}>
          {/*BOTON EDITAR*/}
          <Pressable
            style={styles.edbutton}
            onPress={() => navigation.navigate("Agregar", { transaccion: item })}
          >
            <Ionicons name="pencil" size={16} color="#004d40" />
            <Text style={styles.textoEditar}>Editar</Text>
          </Pressable>
          {/*BOTON ELIMINAR*/}
          <Pressable
            style={styles.edbutton}
            onPress={() => {
              // Confirmación antes de eliminar
              Alert.alert( 
                "Confirmar eliminación",
                "¿Estás seguro de que quieres eliminar esta transacción?",
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Eliminar", style: "destructive", onPress: () => eliminarTransaccion(item.id) }
                ]
              );
            }}
          >
            <Ionicons name="trash" size={16} color="rgb(7, 7, 7)" />
            <Text style={styles.textoEditar}>Eliminar</Text>
          </Pressable>
        </View>
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
  botones: {
    flexDirection: "column",
    gap: 15,
  },
  edbutton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#95ffda",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  textoEditar: {
    fontSize: 13,
    fontWeight: "600",
    color: "#004d40",
  },
});

export default TransaccionItem;
