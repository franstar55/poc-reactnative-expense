import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Categoria, TipoMovimiento } from "../types/tipos";
import { CategoriasContext } from "../Context/CategoriasContext";
import { useNavigation, useRoute } from "@react-navigation/native";

// prettier-ignore
const EMOJIS_SUGERIDOS = [
  "🍔", "🚗", "💊", "💰", "📈", "💼", "🎭", "🏠",
  "✈️", "🛒", "🎓", "💡", "🎮", "🐾", "🎁", "📁",
  "📱", "☕", "🏋️", "📚", "👕", "🎬", "🍕", "🛠️",
];

const AgregarCategoria = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const context = useContext(CategoriasContext);
  const categoriaEdit = route.params?.categoria;

  const [nombre, setNombre] = useState("");
  const [tipoMovimiento, setTipo] = useState<TipoMovimiento>("gasto");
  const [imagen, setImagen] = useState("📁");

  useEffect(() => {
    if (categoriaEdit) {
      setNombre(categoriaEdit.nombre);
      setImagen(categoriaEdit.imagen || "📁");

      if (categoriaEdit.tipo === "gasto" || categoriaEdit.tipo === "ingreso") {
        setTipo(categoriaEdit.tipo);
      }
    }
  }, [categoriaEdit]);

  if (!context) {
    return <Text>Error: Context no disponible</Text>;
  }

  const { categorias, agregarCategoria, actualizarCategoria } = context;

  const resetFormulario = () => {
    setNombre("");
    setTipo("gasto");
    setImagen("📁");
  };

  const guardarCategoria = () => {
    if (!nombre.trim()) {
      Alert.alert("Nombre vacío", "El nombre de la categoría es obligatorio.");
      return;
    }

    if (tipoMovimiento !== "gasto" && tipoMovimiento !== "ingreso") {
      Alert.alert("Tipo no admitido", "El tipo de movimiento debe ser 'gasto' o 'ingreso'.");
      return;
    }

    if (categoriaEdit) {
      // MODO EDICION mantiene id original
      actualizarCategoria({
        ...categoriaEdit,
        nombre: nombre.trim(),
        tipo: tipoMovimiento,
        imagen: imagen.trim() || "📁",
      });
    } else {
      // MODO CREACION con ID secuencial
      const maxId = categorias.reduce((max, cat) => {
        const num = parseInt(cat.id, 10);
        return !isNaN(num) && num > max ? num : max;
      }, categorias.length);

      const nuevaCategoria: Categoria = {
        id: (maxId + 1).toString(),
        tipo: tipoMovimiento,
        nombre: nombre.trim(),
        imagen: imagen.trim() || "📁",
      };
      agregarCategoria(nuevaCategoria);
    }

    resetFormulario();
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 80}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Tipo de movimiento */}
          <Text style={styles.subtitulo}>Tipo de Categoría</Text>
          <View style={styles.contenedorTipoMov}>
            <Pressable
              style={[styles.tipoMovBoton, tipoMovimiento === "gasto" && styles.botonSeleccionado]}
              onPress={() => setTipo("gasto")}
            >
              <Text style={styles.textoBotones}>Gasto</Text>
            </Pressable>

            <Pressable
              style={[
                styles.tipoMovBoton,
                tipoMovimiento === "ingreso" && styles.botonSeleccionado,
              ]}
              onPress={() => setTipo("ingreso")}
            >
              <Text style={styles.textoBotones}>Ingreso</Text>
            </Pressable>
          </View>

          {/* Nombre de la categoría */}
          <Text style={styles.subtitulo}>Nombre de la Categoría</Text>
          <TextInput
            style={styles.contenedor}
            placeholder="Ej. Supermercado, Gimnasio..."
            value={nombre}
            onChangeText={setNombre}
          />

          {/* """imagen""" */}
          <Text style={styles.subtitulo}>Ícono / Emoji</Text>
          <View style={styles.emojiPreviewContainer}>
            <Text style={styles.emojiPreview}>{imagen || "📁"}</Text>
            <TextInput
              style={styles.inputEmoji}
              placeholder="O escribe un emoji..."
              value={imagen}
              onChangeText={setImagen}
              maxLength={4}
            />
          </View>

          <Text style={styles.subtituloSugerencias}>Sugerencias rápidas:</Text>
          <View style={styles.emojisGrid}>
            {EMOJIS_SUGERIDOS.map((emoji, index) => (
              <Pressable
                key={index}
                style={[styles.emojiButton, imagen === emoji && styles.emojiButtonSeleccionado]}
                onPress={() => setImagen(emoji)}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </Pressable>
            ))}
          </View>

          {/* Guardar / agregar */}
          <Pressable style={styles.botonAgregar} onPress={guardarCategoria}>
            <Text style={styles.textoAgregar}>
              {categoriaEdit ? "GUARDAR CAMBIOS" : "AGREGAR CATEGORÍA"}
            </Text>
          </Pressable>

          {/* Cancelar */}
          <Pressable
            style={styles.botonCancelar}
            onPress={() => {
              resetFormulario();
              navigation.goBack();
            }}
          >
            <Text style={styles.textoCancelar}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AgregarCategoria;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 140,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 15,
    paddingTop: 15,
    paddingBottom: 5,
  },
  contenedor: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    padding: 15,
    backgroundColor: "rgba(62, 176, 66, 0.15)",
    fontSize: 18,
    margin: 10,
  },
  contenedorTipoMov: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    padding: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tipoMovBoton: {
    width: "48%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#a6a6a6",
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  botonSeleccionado: {
    backgroundColor: "#4CAF50",
    borderColor: "#010602",
    borderWidth: 1,
  },
  textoBotones: {
    fontSize: 17,
    fontWeight: "bold",
  },
  emojiPreviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    gap: 12,
  },
  emojiPreview: {
    fontSize: 36,
    padding: 10,
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 16,
    backgroundColor: "rgba(62, 176, 66, 0.1)",
    textAlign: "center",
  },
  inputEmoji: {
    flex: 1,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    padding: 15,
    backgroundColor: "rgba(62, 176, 66, 0.15)",
    fontSize: 16,
  },
  subtituloSugerencias: {
    fontSize: 14,
    color: "#666",
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  emojisGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginHorizontal: 10,
    marginTop: 5,
  },
  emojiButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  emojiButtonSeleccionado: {
    borderColor: "#4CAF50",
    backgroundColor: "rgba(62, 176, 66, 0.25)",
    borderWidth: 2,
  },
  emojiText: {
    fontSize: 22,
  },
  botonAgregar: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    margin: 20,
    marginTop: 30,
  },
  textoAgregar: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  botonCancelar: {
    padding: 12,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: -10,
  },
  textoCancelar: {
    color: "#888",
    fontSize: 16,
    fontWeight: "600",
  },
});
