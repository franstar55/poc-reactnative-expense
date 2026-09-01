import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../screens/Inicio";
import Movimientos from "../screens/Movimientos";
import AgregarTransaccion from "../screens/AgregarT";
import Ajustes from "../screens/Ajustes";
import AgregarCategoria from "../screens/AgregarCategoria";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tabs = createBottomTabNavigator(); // crea navegador de pestañas inferiores
const AjustesStackNav = createNativeStackNavigator();

function AjustesStack() {
  return (
    <AjustesStackNav.Navigator>
      <AjustesStackNav.Screen
        name="AjustesPrincipal"
        component={Ajustes}
        options={{ title: "Ajustes de Categorías", headerTitleAlign: "center" }}
      />
      <AjustesStackNav.Screen
        name="AgregarCategoria"
        component={AgregarCategoria}
        options={({ route }: any) => ({
          title: route.params?.categoria ? "Editar Categoría" : "Nueva Categoría",
          headerTitleAlign: "center",
        })}
      />
    </AjustesStackNav.Navigator>
  );
}

function MyTabs() {
  const insets = useSafeAreaInsets(); // Obtiene el margen seguro del dispositivo

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 65 + insets.bottom, // Altura base + espacio de la barra de gestos
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="Agregar"
        component={AgregarTransaccion}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="Movimientos"
        component={Movimientos}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="Ajustes"
        component={AjustesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Tabs.Navigator>
  );
}

export default function NavegadorApp() {
  return <MyTabs />;
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 4,
    paddingTop: 4,
  },

  tabBarLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
});
