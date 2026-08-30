import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import { TransaccionesContext } from "../Context/TransaccionesContext";

const Movimientos = () => {
  const context = useContext(TransaccionesContext);

  if (!context) {
    return <Text>Error: Context no disponible</Text>;
  }

  const { transacciones } = context;

  return (
    <View>
      <Text>Mis movimientos</Text>

      <FlatList
        data={transacciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.tipoMovimiento}</Text>

            <Text>${item.monto}</Text>

            <Text>{item.descripcion}</Text>

            <Text>Categoría: {item.categoriaId}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Movimientos;
