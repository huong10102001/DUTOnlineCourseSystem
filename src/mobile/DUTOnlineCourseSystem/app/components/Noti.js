import React from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, Card, IconButton } from "react-native-paper";
import { getAvatar, getNotificationImage } from "../../utils/getImage";
import { useNavigation } from "@react-navigation/native";

const Noti = ({ props }) => {
  const navigate = useNavigation()
  return (
    <TouchableOpacity>
      <Card
        style={{
          borderColor: "white",
          borderWidth: 0,
          borderRadius: 0,
          backgroundColor: props.isRead ? "#F5F5F5" : "white",
        }}
      >
        <Card.Title
          title={props.title}
          subtitle={props.time_comment}
          titleStyle={{
            flexWrap: "wrap",
            overflow: "scroll",
          }}
          left={() => (
            <Avatar.Image
              size={40}
              style={{ backgroundColor: "white" }}
              source={{
                uri: props.user_reply
                  ? props.user_reply.avatar || getAvatar()
                  : getNotificationImage(),
              }}
            />
          )}
        />
      </Card>
    </TouchableOpacity>
  );
};
export default Noti;

