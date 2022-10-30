// ./navigation/StackNavigator.js import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"; 
import AnnouncementScreen from "../screens/AnnouncementScreen";
import HomeScreen from "../screens/HomeScreen"
import ProfileScreen from '../screens/ProfileScreen';
import MyCourseScreen from '../screens/MyCourseScreen';
import DetailCourse from "../screens/DetailCourse";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import storeRedux from "../store/store";
import { shallowEqual, useSelector } from 'react-redux';
import Course from "../components/Course"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 
const MainNavigator = () => 
{   
  let isLogin = useSelector((state)=>state.auth.isLogin)
  if(!isLogin){
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
        </Stack.Navigator>
      </>
    );
  }
  else{
    return (
      <>
        <Tab.Navigator initialRouteName="Login">
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              showIcon: true,
              tabBarIcon: ({ color }) => (
                <FontAwesome size={20} color={color} name="home" />
              ),
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: 800,
              },
              tabBarActiveTintColor: "#024547",
            }}
            screenOptions={{
              tabBarStyle: { position: "absolute" },
            }}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              showIcon: true,
              tabBarIcon: ({ color }) => (
                <FontAwesome size={18} color={color} name="youtube-play" />
              ),
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: 800,
              },
              tabBarActiveTintColor: "#024547",
              tabBarIconStyle: {
                color: "white",
              },
            }}
            name="My Course"
            component={MyCourseScreen}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              showIcon: true,
              tabBarIcon: ({ color }) => (
                <FontAwesome size={18} color={color} name="bell" />
              ),
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: 800,
              },
              tabBarIndicatorStyle: {
                borderBottomColor: "#C2D5A8",
                borderBottomWidth: 2,
              },
              tabBarIconStyle: ({ focused }) => (
                (borderTopWidth = 20), (borderColor = "black")
              ),
              tabBarActiveTintColor: "#024547",
              tabBarButtonColor: "#fff",
            }}
            name="Announce"
            component={DetailCourse}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              showIcon: true,
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: 800,
              },
              tabBarActiveTintColor: "#024547",
              tabBarIconStyle: {
                color: "white",
              },
              tabBarIcon: ({ color }) => (
                <FontAwesome size={18} color={color} name="user" />
              ),
            }}
            name="Profile"
            component={ProfileScreen}
          />
        </Tab.Navigator>
      </>
    );
  }
}

export { MainNavigator };