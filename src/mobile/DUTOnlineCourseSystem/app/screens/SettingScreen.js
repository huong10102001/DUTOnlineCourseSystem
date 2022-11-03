import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect, useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authAction";
const SettingScreen = ({navigation}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <View style={{ padding: 25 }}>
      <View style={styles.contentComponent}>
        <View style={{ flexDirection: "row", minHeight: 60 }}>
          <View style={{ width: "30%", alignItems: "center", minHeight: 60 }}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
              }}
            ></Image>
          </View>
          <View
            style={{
              width: "70%",
              paddingLeft: 10,
              minHeight: 60,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
              {user.full_name}
            </Text>
            <Text style={{}}>{user.role}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.contentComponent, styles.spaceBetweenComponent]}>
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
                name="file-account"
                width={20}
                style={{ width: 20 }}
              />
              <Text
                style={{ color: "#024547", fontWeight: '500', paddingLeft: 12 }}
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
        <TouchableOpacity onPress={()=>{navigation.navigate("Editprofile")}}>
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
                style={{ color: "#024547", fontWeight: '500', paddingLeft: 12 }}
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
              <FontAwesome
                size={18}
                color="#024547"
                name="certificate"
                width={20}
                style={{ width: 20 }}
              />
              <Text
                style={{ color: "#024547", fontWeight: '500', paddingLeft: 12 }}
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
        <TouchableOpacity onPress={()=>{dispatch(logout())}}>
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
                style={{ color: "#024547", fontWeight: '500', paddingLeft: 12 }}
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
    headerTitle:'Duong Anh Tuan'
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
  width_30: {
    width: "30%",
  },
  avatar: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  spaceBetweenComponent: {
    marginTop: 25,
  },
  line:{
    margin:8,
    height:1,
    width:'90%',
    backgroundColor:'gray',
    justifyContent:'center',
    opacity:0.5,
  }
});
