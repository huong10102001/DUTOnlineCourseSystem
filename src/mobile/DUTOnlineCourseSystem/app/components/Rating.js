import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getCourseProcess } from "../actions/courseProcessAction";
import { Checkbox } from "react-native-paper";
import renderStar from "../../utils/renderStar";
import { render } from "react-dom";
const Rating = ({props}) => {
  return (
    <View style={{ paddingBottom: 8 }}>
      <View style={{ flexDirection: "row", paddingBottom: 8 }}>
        <View
          style={{
            width: "25%",
            alignItems: "center",
            minHeight: 50,
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.avatar}
            source={{
              uri:
                props.user.avatar ||
                "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
            }}
          ></Image>
        </View>
        <View
          style={{
            width: "75%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "500" }}>{props.user.full_name}</Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {renderStar(parseInt(props.star_rating))}
          </View>
        </View>
      </View>
      <View style={{ paddingBottom: 8 }}>
        <Text style={{ fontWeight: "500", paddingBottom: 4 }}>
          {props.title}
        </Text>
        <Text>{props.content}</Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "gray",
          opacity: 0.2,
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      ></View>
    </View>
  );
};
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
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
export default Rating;
