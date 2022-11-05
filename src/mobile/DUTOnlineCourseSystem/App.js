import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import storeRedux from "./app/store/store";
import { MainNavigator } from "./app/navigation/stackNavigator";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={storeRedux}>
      <NavigationContainer>
        <PaperProvider>
          <MainNavigator />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
}
