import { StyleSheet, Text, View } from "react-native";
import NavegadorApp from "./src/appNavigation/NavegadorApp";
import { NavigationContainer } from "@react-navigation/native";
import { TransaccionesProvider } from "./src/Context/TransaccionesContext";

export default function App() {
  return (
    <TransaccionesProvider>
      <NavigationContainer>
        <NavegadorApp />
      </NavigationContainer>
    </TransaccionesProvider>
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
