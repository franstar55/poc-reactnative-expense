import { StyleSheet } from "react-native";
import NavegadorApp from "./src/appNavigation/NavegadorApp";
import { NavigationContainer } from "@react-navigation/native";
import { TransaccionesProvider } from "./src/Context/TransaccionesContext";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <TransaccionesProvider>
        <NavigationContainer>
          <NavegadorApp />
        </NavigationContainer>
      </TransaccionesProvider>
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
