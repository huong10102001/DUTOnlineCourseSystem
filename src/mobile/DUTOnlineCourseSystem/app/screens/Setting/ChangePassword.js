import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserInfo from "../../components/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourse from "../../components/EnrolledCourse";
import { Button, TextInput } from "react-native-paper";
import { changePassword } from "../../actions/userAction";

const ChangePassword = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [oldPW, setOldPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [confPW, setConfPW] = useState("");
  const handleSave = () => {
    if (oldPW == "") {
      Alert.alert("Error", "Please input Old Password");
      return;
    }
    if (newPW == "") {
      Alert.alert("Error", "Please input New Password");
      return;
    }
    if (newPW != confPW) {
      Alert.alert("Error", "New password different Confirm Password");
      return;
    }
    dispatch(
      changePassword({
        old_password: oldPW,
        new_password: newPW,
      })
    );
  };
  return (
    <ScrollView style={{ padding: 25, paddingBottom: 200 }}>
      <UserInfo props={{ user: user }} />
      <View style={styles.spaceBetweenComponent}>
        <View style={styles.contentComponent}>
          <TextInput
            placeholder="Old password"
            secureTextEntry={true}
            label="Old password"
            mode="outlined"
            outlineColor="#024547"
            activeOutlineColor="#024547"
            value={oldPW}
            onChangeText={(pw) => {
              console.log(pw);
              setOldPW(pw);
            }}
          />
          <TextInput
            placeholder="New password"
            secureTextEntry={true}
            label="New password"
            mode="outlined"
            outlineColor="#024547"
            activeOutlineColor="#024547"
            value={newPW}
            onChangeText={(pw) => {
              setNewPW(pw);
            }}
          />
          <TextInput
            placeholder="Confirm password"
            secureTextEntry={true}
            label="Confirm password"
            mode="outlined"
            outlineColor="#024547"
            activeOutlineColor="#024547"
            value={confPW}
            onChangeText={(pw) => {
              setConfPW(pw);
            }}
          />
          <TouchableOpacity
            style={{ marginTop: 8 }}
            onPress={() => {
              handleSave();
            }}
          >
            <Button
              buttonColor="#024547"
              textColor="white"
              style={{ borderRadius: 8 }}
            >
              Save
            </Button>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[styles.spaceBetweenComponent, { paddingBottom: 50 }]}
      ></View>
    </ScrollView>
  );
};
export default ChangePassword;

const styles = StyleSheet.create({
  spaceBetweenComponent: {
    marginTop: 25,
  },
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "justify",
    width: "100%",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
