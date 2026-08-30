import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { Categoria, TipoMovimiento, Transaccion } from "../types/tipos";
import { categorias } from "../data/categorias";
import { Ionicons } from "@expo/vector-icons";
import { TransaccionesContext } from "../Context/TransaccionesContext";

const Agregar = () => {
  //useState el conjunto que guarda el valor actual y la funcion para cambiarlo
  // ej monto guarda el valor actual
  //setMonto sirve para modificarlo
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null); //parentesis indica que inicialmente va a ser null, pero puede guardar Cat o null
  const [tipoMovimiento, setTipoMovimiento] = useState<TipoMovimiento>("gasto"); //gastovalor inicial, TipoMovimiento indica el tipo de dato que puede guardar ese estado
  const [mostrarCategorias, setMostrarCategorias] = useState(false); //esta variable controla si la lista de categorías está abierta o cerrada (false cerrada)

  const context = useContext(TransaccionesContext); //accede a la info de TransaccionesContext
  if (!context) {
    return <Text>Error: Context no disponible</Text>;
  }

  const { agregarTransaccion } = context; //sacamos agregarTransaccion del Context para poder usar directamente "agregarTransaccion"

  const guardaCategoria = (categoria: Categoria) => {
    setCategoriaSeleccionada(categoria); //guarda cat
  };

  const categoriasFiltradas = categorias.filter(
    //nueva lista con categorias filtradas x cond
    (categoria) => categoria.tipo === tipoMovimiento
  );

  const guardarTransaccion = () => {
    const montoNumero = Number(monto); //convierte el monto

    if (!montoNumero || montoNumero <= 0) return; //verifica si el monto tiene valor valido(!montoNUmero) o si es negativo
    if (!categoriaSeleccionada) return;

    const nuevaTransaccion: Transaccion = {
      //crear nueva transaccion
      id: Date.now().toString(),
      tipoMovimiento: tipoMovimiento, //guarda el tipo que eligio el usuario
      monto: Number(monto),
      categoriaId: categoriaSeleccionada.id,
      descripcion: descripcion,
      fecha: new Date().toISOString().split("T")[0],
    };

    agregarTransaccion(nuevaTransaccion); //guardamos la transaccion con la funcion del context

    //resetea form luego de la creacion
    setMonto("");
    setDescripcion("");
    setCategoriaSeleccionada(null);
    setTipoMovimiento("gasto");
    setMostrarCategorias(false);
  };

  return (
    <View>
      <Text style={styles.titulo}>Registrá tus movimientos y controlá tus gastos</Text>

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
              tipoMovimiento === "gasto" && styles.botonSeleccionado, //si tocamos se aplica el estilo
            ]}
            onPress={() => setTipoMovimiento("gasto")} //cuando tocamos cambiamos el estado
          >
            <Text style={styles.textoBotones}>Gasto</Text>
          </Pressable>

          <Pressable
            style={[styles.tipoMovBoton, tipoMovimiento === "ingreso" && styles.botonSeleccionado]}
            onPress={() => setTipoMovimiento("ingreso")}
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
              if (mostrarCategorias === true) {
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
          {/* como el map recorre las cat, creamos un presable p cada una*/}
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
          <Text style={styles.textoAgregar}>AGREGAR</Text>
        </Pressable>
      </View>
    </View>
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
    backgroundColor: "rgba(62, 176, 66, 0.15)",
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
    borderWidth: 2,
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
});
