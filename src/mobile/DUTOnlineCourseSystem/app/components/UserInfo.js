import * as React from "react";
import { View, StyleSheet,Image,Text } from "react-native";
import { Chip } from "react-native-paper";
import { getAvatar } from "../../utils/getImage";
import COLOR from "../const/color";

const UserInfo = ({ props }) => {
  return (
    <View style={styles.contentComponent}>
      <View style={{ flexDirection: "row", minHeight: 60 }}>
        <View style={{ width: "30%", alignItems: "center", minHeight: 60 }}>
          <Image
            style={styles.avatar}
            source={{
              uri: props.user.avatar || getAvatar(),
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
          <Text style={{ fontSize: 18, fontWeight: "700" }}>
            {props.user.full_name}
          </Text>
          <Text style={{}}>{props.user.role}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "justify",
    width: "100%",
  },
  avatar: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
