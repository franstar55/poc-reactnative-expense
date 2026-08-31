import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TransaccionesContext } from "../Context/TransaccionesContext";
import { Transaccion } from "../types/tipos";
import TransaccionItem from "../components/TransaccionItem";
import ListaVacia from "../components/ListaVacia";

const Movimientos = () => {
  const context = useContext(TransaccionesContext);

  if (!context) {
    return <Text>Error: Context no disponible</Text>;
  }

  const { transacciones } = context;

  // orden inverso
  const listaOrdenada = [...transacciones].reverse();

  return (
    <View style={styles.container}>
      <FlatList<Transaccion>
        data={listaOrdenada}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransaccionItem item={item} />}
        ListEmptyComponent={
          <ListaVacia
            titulo="No hay movimientos"
            mensaje="Tus gastos e ingresos registrados aparecerán aquí."
          />
        }
        contentContainerStyle={listaOrdenada.length === 0 ? styles.listaVaciaContainer : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },
  listaVaciaContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default Movimientos;
