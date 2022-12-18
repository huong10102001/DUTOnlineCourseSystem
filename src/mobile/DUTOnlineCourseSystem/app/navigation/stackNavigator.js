import React from "react";
import LoginScreen from "../screens/LoginRegister/LoginScreen";
import RegisterScreen from "../screens/LoginRegister/RegisterScreen"; 
import NotificateScreen from "../screens/Notificate/NotificateScreen";
import HomeScreen from "../screens/Home/HomeScreen"
import ProfileScreen from '../screens/Setting/ProfileScreen';
import MyCourseScreen from '../screens/MyCourse/MyCourseScreen';
import DetailCourse from "../screens/DetailCourse/DetailCourse";
import SettingScreen from "../screens/Setting/SettingScreen";
import EditProfileScreen from "../screens/Setting/EditProfileScreen";
// import DrawerContent from "../screens/DrawerContent";
import { DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import storeRedux from "../store/store";
import { shallowEqual, useSelector } from 'react-redux';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigator } from "react-navigation";
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Course from "../components/Course";
import Quizz from "../screens/Lesson/Quiz"
import Lesson from "../screens/Lesson/Lesson";
import SearchScreen from "../screens/Home/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 
const SettingNavigator = () =>{
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerTitleStyle: {
            color: "#fff",
            alignSelf: "center",
            alignItem: "center",
          },
          headerStyle: {
            backgroundColor: "#024547",
          },
        }}
      />
      <Stack.Screen
        name="Editprofile"
        component={EditProfileScreen}
        options={{
          title: "Edit profile",
          headerTitleStyle: {
            color: "#fff",
            alignSelf: "center",
            alignItem: "center",
          },
          headerStyle: {
            backgroundColor: "#024547",
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerTitleStyle: {
            color: "#fff",
            alignSelf: "center",
            alignItem: "center",
          },
          headerStyle: {
            backgroundColor: "#024547",
          },
        }}
      />
    </Stack.Navigator>
  );
}
const HomeNavigator = () =>{
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleStyle: {
            color: "#fff",
            alignSelf: "center",
            alignItem: "center",
          },
          headerStyle: {
            backgroundColor: "#024547",
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailCourse"
        component={DetailCourse}
        options={{
          title: "Detail course",
          headerTitleStyle: {
            color: "#fff",
            alignSelf: "center",
            alignItem: "center",
          },
          headerStyle: {
            backgroundColor: "#024547",
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Lesson"
        component={Lesson}
        options={{
          title: "Lesson",
          headerTitleStyle: {
            color: "#fff",
            alignSelf: "center",
            alignItem: "center",
          },
          headerStyle: {
            backgroundColor: "#024547",
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitleStyle: {
            color: "#fff",
            alignSelf: "center",
            alignItem: "center",
          },
          headerStyle: {
            backgroundColor: "#024547",
          },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const MyCourseNavigator = () => {
  return(
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
      headerBackButtonMenuEnabled: true,
    }}
  >
    <Stack.Screen
      name="My Course"
      component={MyCourseScreen}
      options={{
        headerTitleStyle: {
          color: "#fff",
          alignSelf: "center",
          alignItem: "center",
        },
        headerStyle: {
          backgroundColor: "#024547",
        },
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="DetailCourse"
      component={DetailCourse}
      options={{
        title: "Detail course",
        headerTitleStyle: {
          color: "#fff",
          alignSelf: "center",
          alignItem: "center",
        },
        headerStyle: {
          backgroundColor: "#024547",
        },
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Lesson"
      component={Lesson}
      options={{
        title: "Lesson",
        headerTitleStyle: {
          color: "#fff",
          alignSelf: "center",
          alignItem: "center",
        },
        headerStyle: {
          backgroundColor: "#024547",
        },
        headerShown: false,
      }}
    />
  </Stack.Navigator>
  )
}

const MainNavigator = () => 
{   
  const navigation = useNavigation();
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
            component={HomeNavigator}
            options={{
              headerShown: false,
              showIcon: true,
              tabBarIcon: ({ color }) => (
                <FontAwesome size={20} color={color} name="home" />
              ),
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: "800",
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
              headerTitle: "My Course",
              showIcon: true,
              tabBarIcon: ({ color }) => (
                <FontAwesome size={18} color={color} name="youtube-play" />
              ),
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: "800",
              },
              tabBarActiveTintColor: "#024547",
              tabBarIconStyle: {
                color: "white",
              },
            }}
            name="MyCourse"
            component={MyCourseNavigator}
          />
          <Tab.Screen
            options={{
              headerShown: true,
              title: "Notification",
              headerTitleStyle: {
                color: "#fff",
                alignSelf: "center",
                alignItem: "center",
              },
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#024547",
              },
              showIcon: true,
              tabBarIcon: ({ color }) => (
                <FontAwesome size={18} color={color} name="bell" />
              ),
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: "800",
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
            name="Notificate"
            component={NotificateScreen}
          ></Tab.Screen>
          <Tab.Screen
            options={{
              headerShown: false,
              showIcon: true,
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: "800",
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
            component={SettingScreen}
          />
        </Tab.Navigator>
      </>
    );
  }
}

export { MainNavigator };