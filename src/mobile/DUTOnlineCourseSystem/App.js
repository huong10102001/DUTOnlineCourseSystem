import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import storeRedux from './app/store/store'
import { MainNavigator } from './app/navigation/stackNavigator';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Provider store={storeRedux}> 
        <NavigationContainer>
          <MainNavigator/>  
        </NavigationContainer>
      </Provider>
  )
}
