import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./app/screens/LoginRegister/LoginScreen";
import RegisterScreen from "./app/screens/LoginRegister/RegisterScreen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import storeRedux from "./app/store/store";
import { MainNavigator } from "./app/navigation/stackNavigator";
import {initializeApp} from '@react-native-firebase/app'
import { getDatabase, ref, push, onValue, query, orderByChild, get } from "@react-native-firebase/database";

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
