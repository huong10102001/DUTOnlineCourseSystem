import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import CourseProcess from "../components/CourseProcess";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { connect, useDispatch, useSelector } from "react-redux";
import { getListCoursesProcess } from "../actions/coursesProcessListAction";
const MyCourseScreen = ({ navigator }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const courses = useSelector((state) => state.courses.results);
  useEffect(() => {
    dispatch(getListCoursesProcess());
  }, []);
  const mycourse = useSelector((state) => state.coursesProcessList.results);
  return (
    <ScrollView>
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
              style={{ flex: 2, flexDirection: "row", alignItems: "center" }}
            >
              <Text
                style={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: 20,
                  lineHeight: 24,
                  color: "white",
                }}
              >
                Xin Chào
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
                lineHeight: 24,
                color: "white",
                marginTop: 0,
              }}
            >
              {user.full_name}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                padding: 12,
                alignItems: "center",
                borderRadius: 28,
                borderWidth: 2,
                borderColor: "gray",
                backgroundColor: "white",
                position: "absolute",
                bottom: 0,
                width: 56,
              }}
            >
              <Entypo
                size={26}
                color="black"
                name="magnifying-glass"
                color="#024547"
                height="20"
                width="20"
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                // padding: 12,
                alignItems: "center",
                borderRadius: 28,
                borderWidth: 2,
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
                  uri: "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
                }}
              ></Image>
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
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            {/* <CourseProcess></CourseProcess> */}
            <View style={{ marginBottom: 25, marginTop: 25 }}>
              {mycourse.map((e, index) => (
                <View style={{ marginBottom: 50 }}>
                  <CourseProcess props={e}></CourseProcess>
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
    // flex:1,
    backgroundColor: "#024547",
    height: 150,
    width: "100%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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
