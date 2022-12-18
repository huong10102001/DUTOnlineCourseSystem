import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { connect, useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authAction";
import { NativeModules } from "react-native";
import UserInfo from "../../components/UserInfo";

const SettingScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <View style={{ padding: 25 }}>
      <UserInfo props={{ user: user }} />

      <View style={[styles.contentComponent, styles.spaceBetweenComponent]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 4,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                size={18}
                color="#024547"
                name="file-account"
                width={20}
                style={{ width: 20 }}
              />
              <Text
                style={{ color: "#024547", fontWeight: "500", paddingLeft: 12 }}
              >
                Profile
              </Text>
            </View>
            <MaterialIcons
              size={18}
              color="#024547"
              name="navigate-next"
              width={20}
              style={{ width: 20, right: 0 }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Editprofile");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 4,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Entypo
                size={18}
                color="#024547"
                name="edit"
                width={20}
                style={{ width: 20 }}
              />
              <Text
                style={{ color: "#024547", fontWeight: "500", paddingLeft: 12 }}
              >
                Edit profile
              </Text>
            </View>
            <MaterialIcons
              size={18}
              color="#024547"
              name="navigate-next"
              width={20}
              style={{ width: 20, right: 0 }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 4,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                size={18}
                color="#024547"
                name="certificate"
                width={20}
                style={{ width: 20 }}
              />
              <Text
                style={{ color: "#024547", fontWeight: "500", paddingLeft: 12 }}
              >
                Certificate
              </Text>
            </View>
            <MaterialIcons
              size={18}
              color="#024547"
              name="navigate-next"
              width={20}
              style={{ width: 20, right: 0 }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 4,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                size={18}
                color="#024547"
                name="form-textbox-password"
                width={20}
                style={{ width: 20 }}
              />
              <Text
                style={{ color: "#024547", fontWeight: "500", paddingLeft: 12 }}
              >
                Change password
              </Text>
            </View>
            <MaterialIcons
              size={18}
              color="#024547"
              name="navigate-next"
              width={20}
              style={{ width: 20, right: 0 }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          onPress={() => {
            NativeModules.DevSettings.reload();
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 4,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                size={18}
                color="#024547"
                name="log-out"
                width={20}
                style={{ width: 20 }}
              />
              <Text
                style={{ color: "#024547", fontWeight: "500", paddingLeft: 12 }}
              >
                Logout
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
SettingScreen.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: "#024547",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "700",
    },
    headerTitle: "Duong Anh Tuan",
  };
};
export default SettingScreen;

const styles = StyleSheet.create({
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "justify",
    width: "100%",
  },
  spaceBetweenComponent: {
    marginTop: 25,
  },
  width_30: {
    width: "30%",
  },
  avatar: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  line: {
    margin: 8,
    height: 1,
    width: "90%",
    backgroundColor: "gray",
    justifyContent: "center",
    opacity: 0.5,
  },
});
