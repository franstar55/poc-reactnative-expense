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
import { Categoria, TipoMovimiento, Transaccion } from "../types/tipos";
import { categorias } from "../data/categorias";
import { Ionicons } from "@expo/vector-icons";
import { TransaccionesContext } from "../Context/TransaccionesContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const Agregar = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const context = useContext(TransaccionesContext);

  // obtiene la transaccion a editar desde los parametros si es que existe
  const transaccionEdit = route.params?.transaccion;

  // datos de la transaccion
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
  const [tipoMovimiento, setTipoMovimiento] = useState<TipoMovimiento>("gasto");

  // lista de categorias; false => lista cerrada
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  // precarga los datos si es una edicion (todos los hooks deben ejecutarse antes de cualquier return)
  useEffect(() => {
    if (transaccionEdit) {
      setMonto(transaccionEdit.monto.toString());
      setDescripcion(transaccionEdit.descripcion);
      setTipoMovimiento(transaccionEdit.tipoMovimiento);

      const cat = categorias.find((c) => c.id === transaccionEdit.categoriaId);
      setCategoriaSeleccionada(cat || null);
    }
  }, [transaccionEdit]);

  if (!context) {
    return <Text>Error: Context no disponible</Text>;
  }

  // obtiene la funcion para agregar y actualizar transacciones
  const { agregarTransaccion, actualizarTransaccion } = context;

  const guardaCategoria = (categoria: Categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const categoriasFiltradas = categorias.filter((categoria) => categoria.tipo === tipoMovimiento);

  const resetFormulario = () => {
    setMonto("");
    setDescripcion("");
    setCategoriaSeleccionada(null);
    setTipoMovimiento("gasto");
    setMostrarCategorias(false);
    navigation.setParams({ transaccion: undefined });
  };

  const guardarTransaccion = () => {
    const montoNumero = Number(monto);

    if (Number.isNaN(montoNumero) || montoNumero <= 0) {
      Alert.alert("Monto inválido", "El monto debe ser mayor a 0.");
      return;
    }

    if (!categoriaSeleccionada) {
      Alert.alert("Categoría requerida", "La categoría es obligatoria.");
      return;
    }

    if (transaccionEdit) {
      // MODO EDICION mantiene id y fecha originales
      actualizarTransaccion({
        ...transaccionEdit,
        monto: montoNumero,
        tipoMovimiento,
        categoriaId: categoriaSeleccionada.id,
        descripcion,
      });
    } else {
      // MODO CREACION
      const nuevaTransaccion: Transaccion = {
        id: Date.now().toString(),
        tipoMovimiento: tipoMovimiento,
        monto: montoNumero,
        categoriaId: categoriaSeleccionada.id,
        descripcion: descripcion,
        fecha: new Date().toISOString().split("T")[0],
      };
      agregarTransaccion(nuevaTransaccion);
    }

    resetFormulario();
    navigation.navigate("Inicio");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 80} // compensa la barra de tabs y header
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true} // ajusta el scroll al foco
      >
        <View>
          <View>
            <Text style={styles.subtitulo}>Monto</Text>
            <TextInput
              style={styles.contenedor}
              placeholder="$0.00"
              keyboardType="numeric"
              value={monto}
              onChangeText={setMonto}
            />
          </View>

          <Text style={styles.subtitulo}>Tipo de Movimiento</Text>
          <View style={styles.contenedorTipoMov}>
            <Pressable
              style={[
                styles.tipoMovBoton,
                tipoMovimiento === "gasto" && styles.botonSeleccionado, 
              ]}
              onPress={() => {
                setTipoMovimiento("gasto");
                setCategoriaSeleccionada(null);
              }}
            >
              <Text style={styles.textoBotones}>Gasto</Text>
            </Pressable>

            <Pressable
              style={[
                styles.tipoMovBoton,
                tipoMovimiento === "ingreso" && styles.botonSeleccionado,
              ]}
              onPress={() => {
                setTipoMovimiento("ingreso");
                setCategoriaSeleccionada(null);
              }}
            >
              <Text style={styles.textoBotones}> Ingreso</Text>
            </Pressable>
          </View>

          <View>
            <Text style={styles.subtitulo}>Categoría</Text>
            {/* BOTÓN PARA ABRIR/CERRAR LAS CATEGORÍAS USANDO EL USESTATE DE ARRIBA */}
            <Pressable
              style={styles.botonCategoria}
              onPress={() => {
                if (mostrarCategorias) {
                  setMostrarCategorias(false);
                } else {
                  setMostrarCategorias(true);
                }
              }}
            >
              <View style={styles.contenedorCategoria}>
                {/* hay categoriaSeleccionada? SI → mostrar categoriaSeleccionada.imagen NO → mostrar "📂"*/}
                <Text>{categoriaSeleccionada ? categoriaSeleccionada.imagen : "📂"}</Text>
                <Text style={styles.textoCategoria}>
                  {categoriaSeleccionada ? categoriaSeleccionada.nombre : "Elegir categoría"}
                </Text>
              </View>

              {/* name icono,mostrarCategorias ? "chevron-up"(si es true, si las muestra) : "chevron-down"(si es false)*/}
              <Ionicons
                name={mostrarCategorias ? "chevron-up" : "chevron-down"}
                size={22}
                color="#777"
              />
            </Pressable>

            {/* LISTA DE CATEGORÍAS */}
            {mostrarCategorias && (
              <View style={styles.listaCategorias}>
                {categoriasFiltradas.map((categoria) => (
                  <Pressable
                    key={categoria.id}
                    style={styles.itemCategoria}
                    onPress={() => {
                      guardaCategoria(categoria);
                      setMostrarCategorias(false);
                    }}
                  >
                    <View>
                      <Text>{categoria.imagen}</Text>
                      <Text style={styles.textoCategoria}>{categoria.nombre}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View>
            <Text style={styles.subtitulo}>Descripcion</Text>
            <TextInput
              style={styles.contenedor}
              placeholder="Ingrese una Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
            />
          </View>

          <Pressable style={styles.botonAgregar} onPress={guardarTransaccion}>
            <Text style={styles.textoAgregar}>
              {transaccionEdit ? "GUARDAR CAMBIOS" : "AGREGAR"}
            </Text>
          </Pressable>

          {transaccionEdit && (
            <Pressable
              style={styles.botonCancelar}
              onPress={() => {
                resetFormulario();
                navigation.navigate("Inicio");
              }}
            >
              <Text style={styles.textoCancelar}>Cancelar edición</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Agregar;

const styles = StyleSheet.create({
  titulo: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
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

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 15,
    padding: 10,
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
    width: "45%",
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

  botonAgregar: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    margin: 20,
    marginTop: 30,
  },

  textoAgregar: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  botonCategoria: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    backgroundColor: "rgba(62, 176, 66, 0.15)",
    padding: 15,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  contenedorCategoria: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  textoCategoria: {
    fontSize: 18,
  },

  listaCategorias: {
    marginHorizontal: 10,
    marginTop: -5,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },

  itemCategoria: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#d0d0d0",
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 140, // espacio extra al final para que el botón no quede pegado
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
