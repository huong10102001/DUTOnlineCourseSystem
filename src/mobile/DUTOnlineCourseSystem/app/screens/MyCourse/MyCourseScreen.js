import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView,Dimensions,StatusBar, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import CourseProcess from "../../components/CourseProcess";
import Foundation from "@expo/vector-icons/Foundation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { connect, useDispatch, useSelector } from "react-redux";
import { getListCoursesProcess } from "../../actions/coursesProcessListAction";
import { getAvatar } from "../../../utils/getImage";
import { useNavigation } from "@react-navigation/native";

const MyCourseScreen = ({ navigator }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const courses = useSelector((state) => state.courses.results);
  useEffect(() => {
    dispatch(getListCoursesProcess());
  }, []);
  const mycourse = useSelector((state) => state.coursesProcessList.results);
  
  return (
    <ScrollView>
      <StatusBar
        barStyle="white-content"
        hidden={false}
        backgroundColor="#024547"
        translucent={true}
        color="white"
      />
      <View>
        <View style={styles.topNavbar}>
          <View
            style={{
              flex: 6,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 3 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    // fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  Hi
                </Text>
                <FontAwesome
                  size={18}
                  color="black"
                  name="heart"
                  style={{ paddingLeft: 4 }}
                  color="white"
                />
              </View>
              <Text
                style={{
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: 20,
                  color: "white",
                  marginTop: 4,
                }}
              >
                {user.full_name}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <View
                  style={{
                    flex: 1,
                    padding: 12,
                    alignItems: "center",
                    borderRadius: 28,
                    borderWidth: 1,
                    borderColor: "gray",
                    backgroundColor: "white",
                    position: "absolute",
                    bottom: 0,
                    width: 56,
                    marginRight: 4,
                  }}
                >
                  <Foundation
                    size={26}
                    color="black"
                    name="magnifying-glass"
                    color="#024547"
                    height="20"
                    width="20"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  // padding: 12,
                  alignItems: "center",
                  borderRadius: 28,
                  borderWidth: 1,
                  borderColor: "gray",
                  backgroundColor: "white",
                  position: "absolute",
                  bottom: 0,
                  width: 56,
                  height: 56,
                  overflow: "hidden",
                }}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: user.avatar || getAvatar(),
                  }}
                ></Image>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 25,
          }}
        >
          <Text style={styles.titleView}>My course</Text>
          <Text style={styles.seeAll}>{mycourse.length} courses</Text>
        </View>
        <ScrollView style={{ width: "100%" }}>
          <View style={{ alignItems: "center", width: "100%" }}>
            {/* <CourseProcess></CourseProcess> */}
            <View style={{ marginBottom: 28 }}>
              {mycourse.map((e, index) => (
                <View style={{ marginBottom: 10, width: "100%" }} key={index.toString()}>
                  <CourseProcess props={e} width={width}></CourseProcess>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
export default MyCourseScreen;
const styles = StyleSheet.create({
  topNavbar: {
    backgroundColor: "#024547",
    // height: 150,
    width: "100%",
    padding: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    position: "relative",
  },
  search: {
    backgroundColor: "white",
    borderColor: "",
    borderWidth: "1",
    flex: 1,
    padding: 20,
    width: "50",
    height: "50",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  titleView: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.02,
  },
  seeAll: {
    color: "#024547",
    fontWeight: "500",
  },
});
