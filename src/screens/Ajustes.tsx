import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { CategoriasContext } from "../Context/CategoriasContext";
import { Categoria, TipoMovimiento } from "../types/tipos";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Ajustes = () => {
  const navigation = useNavigation<any>();
  const context = useContext(CategoriasContext);
  const [filtroTipo, setFiltroTipo] = useState<TipoMovimiento>("gasto");

  if (!context) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error: Context de categorías no disponible</Text>
      </View>
    );
  }

  const { categorias } = context;

  const categoriasFiltradas = categorias.filter((c) => c.tipo === filtroTipo);

  const renderCategoriaItem = ({ item }: { item: Categoria }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardEmoji}>{item.imagen}</Text>
          <View>
            <Text style={styles.cardNombre}>{item.nombre}</Text>
            <Text style={styles.cardTipo}>
              {item.tipo === "gasto" ? "Gasto" : "Ingreso"} • ID: {item.id}
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.botonEditar}
          onPress={() => navigation.navigate("AgregarCategoria", { categoria: item })}
        >
          <Ionicons name="pencil" size={16} color="#333" />
          <Text style={styles.textoEditar}>Editar</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* cresr nueva categoria */}
      <Pressable
        style={styles.botonNuevaCategoria}
        onPress={() => navigation.navigate("AgregarCategoria")}
      >
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.textoNuevaCategoria}>Nueva Categoría</Text>
      </Pressable>

      {/* filtro por tipo */}
      <View style={styles.contenedorFiltros}>
        <Pressable
          style={[styles.botonFiltro, filtroTipo === "gasto" && styles.botonFiltroActivo]}
          onPress={() => setFiltroTipo("gasto")}
        >
          <Text style={[styles.textoFiltro, filtroTipo === "gasto" && styles.textoFiltroActivo]}>
            Gastos ({categorias.filter((c) => c.tipo === "gasto").length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.botonFiltro, filtroTipo === "ingreso" && styles.botonFiltroActivo]}
          onPress={() => setFiltroTipo("ingreso")}
        >
          <Text style={[styles.textoFiltro, filtroTipo === "ingreso" && styles.textoFiltroActivo]}>
            Ingresos ({categorias.filter((c) => c.tipo === "ingreso").length})
          </Text>
        </Pressable>
      </View>

      {/* lista */}
      <FlatList<Categoria>
        data={categoriasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoriaItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.vacioContainer}>
            <Text style={styles.vacioTexto}>
              No hay categorías de {filtroTipo === "gasto" ? "gastos" : "ingresos"}.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Ajustes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  botonNuevaCategoria: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 15,
    marginBottom: 15,
    gap: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  textoNuevaCategoria: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  contenedorFiltros: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 4,
    marginBottom: 15,
  },
  botonFiltro: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  botonFiltroActivo: {
    backgroundColor: "#fff",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textoFiltro: {
    fontSize: 15,
    fontWeight: "600",
    color: "#777",
  },
  textoFiltroActivo: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 14,
    padding: 14,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardEmoji: {
    fontSize: 28,
  },
  cardNombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardTipo: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  botonEditar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#91ffd7",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  textoEditar: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000000",
  },
  vacioContainer: {
    padding: 40,
    alignItems: "center",
  },
  vacioTexto: {
    color: "#999",
    fontSize: 15,
  },
});
