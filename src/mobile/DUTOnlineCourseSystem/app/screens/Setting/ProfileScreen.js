import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserInfo from "../../components/UserInfo";
import { useSelector } from "react-redux";
import EnrolledCourse from "../../components/EnrolledCourse";

const ProfileScreen = () => {
  const user = useSelector((state) => state.user);
  console.log(user.process_courses.length);
  return (
    <ScrollView style={{ padding: 25, paddingBottom: 200 }}>
      <UserInfo props={{ user: user }} />
      <View style={styles.spaceBetweenComponent}>
        <View style={styles.contentComponent}>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>Bio</Text>
          <Text>{user.bio}</Text>
        </View>
      </View>
      <View style={[styles.spaceBetweenComponent,{paddingBottom:50}]}>
        <View style={styles.contentComponent}>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            Enrolled course
          </Text>
          {user.process_courses.map((course,index)=>{
            return(<EnrolledCourse key={index.toString()} props={{courseProcess: course}}></EnrolledCourse>)
          })}
        </View>
      </View>
    </ScrollView>
  );
};
export default ProfileScreen;

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
  },  boxShadow: {
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
