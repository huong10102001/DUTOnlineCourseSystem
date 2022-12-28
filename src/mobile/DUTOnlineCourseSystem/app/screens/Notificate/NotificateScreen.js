import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import Noti from "../../components/Noti";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  query,
  orderByChild,
  get,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationName, getNotiHasUnread } from "../../firebase/firebaseConfig";
import { getNotification } from "../../actions/notiAction";

const NotificateScreen = ({navigator}) =>{
  const user = useSelector((state)=>state.user)
  const notification = useSelector((state) => state.notification);
  const list_notification = notification.notifications
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNotification());
  }, [notification.noti_number]);
    return (
      <ScrollView style={{}}>
        {list_notification && (
          <>
            {list_notification.map((e) => (
              <Noti props={e}></Noti>
            ))}
          </>
        )}
      </ScrollView>
    );
}
export default NotificateScreen;

const styles = StyleSheet.create({
  // contentComponent: {
  //   padding: 16,
  //   backgroundColor: "white",
  //   borderRadius: 5,
  //   textAlign: "justify",
  //   width: "100%",
  // },
  // container: {
  //   padding:25
  // }
});