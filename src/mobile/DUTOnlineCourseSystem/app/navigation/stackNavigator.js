import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"; 
import AnnouncementScreen from "../screens/AnnouncementScreen";
import HomeScreen from "../screens/HomeScreen"
import ProfileScreen from '../screens/ProfileScreen';
import MyCourseScreen from '../screens/MyCourseScreen';
import DetailCourse from "../screens/DetailCourse";
import SettingScreen from "../screens/SettingScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import VideoLession from "../screens/VideoLesson";
import PDFLession from "../screens/PDFLesson";
import Lession from "../screens/Lession"
import DrawerContent from "../screens/DrawerContent";
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
          title:"Edit profile",
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
    </Stack.Navigator>
  );
}
// const LessonNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Lesson" component={Lession} />
//     </Stack.Navigator>
//   );
// };
// const LessonDrawer = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="LessonNavigator"
//       useLegacyImplementation={false}
//       // drawerContent={(props) => <DrawerContent {...props}></DrawerContent>}
//     >
//       <Drawer.Screen name="Login" component={LoginScreen} />
//       <Drawer.Screen name="LessonNavigator" component={LessonNavigator} />
//     </Drawer.Navigator>
//   );
// };

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
              headerTitle:"My Course",
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
            component={MyCourseScreen}
          />
          <Tab.Screen
            options={{
              headerShown: true,
              title: "Lesson",
              headerTitleStyle: {
                color: "#fff",
                alignSelf: "center",
                alignItem: "center",
              },
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#024547",
              },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                >
                  <Foundation
                    name={"list"}
                    size={28}
                    color={"white"}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              ),
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
            name="Lesson"
            component={Lession}
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
                <Ionicons size={18} color={color} name="md-settings-sharp" />
              ),
            }}
            name="Setting"
            component={SettingNavigator}
          />
        </Tab.Navigator>
      </>
    );
  }
}

export { MainNavigator };