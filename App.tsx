import { StyleSheet } from "react-native";
import NavegadorApp from "./src/appNavigation/NavegadorApp";
import { NavigationContainer } from "@react-navigation/native";
import { CategoriasProvider } from "./src/Context/CategoriasContext";
import { TransaccionesProvider } from "./src/Context/TransaccionesContext";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <CategoriasProvider>
        <TransaccionesProvider>
          <NavigationContainer>
            <NavegadorApp />
          </NavigationContainer>
        </TransaccionesProvider>
      </CategoriasProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
