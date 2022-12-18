import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
const NotificateScreen = ({navigator}) =>{
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentComponent}>
          <Text>Notification</Text>
        </View>
      </ScrollView>
    );
}
export default NotificateScreen;

const styles = StyleSheet.create({
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    // alignItems:''
    textAlign: "justify",
    width: "100%",
  },
  container:{
    padding:25
  }
});