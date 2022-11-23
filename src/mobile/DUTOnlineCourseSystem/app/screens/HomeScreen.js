import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Foundation from "react-native-vector-icons/Foundation";
import React, { useState, useEffect } from "react";
import { Checkbox } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { registerAction } from "../actions/registerAction";
import { connect, useDispatch, useSelector } from "react-redux";
import Course from "../components/Course";
import { getAllCourses } from "../actions/courseAction";
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {width} = Dimensions.get('window');
    useEffect(() => {
      dispatch(getAllCourses());
      console.log(`getAllCourses`);
    }, []);
  let courseState = useSelector((state) => state.courses);
  const listCourse = [
    {
      course: <Course />,
    },
    {
      course: <Course />,
    },
    {
      course: <Course />,
    },
    {
      course: <Course />,
    },
  ];

  return (
    <ScrollView style={{}}>
      <StatusBar
        barStyle="white-content"
        hidden={false}
        backgroundColor="#024547"
        translucent={true}
        color="white"
      />
      {/* Tim kiem va profile */}
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
              <View style={{ flex: 2, flexDirection: "row",alignItems:'center' }}>
                <Text
                  style={{
                    fontStyle: "normal",
                    fontWeight: '400',
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
                  fontWeight: '700',
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
                <Foundation
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
                    uri: user.avatar||"https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
                  }}
                ></Image>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Course */}
      <View style={{ marginBottom: 15 }}>
        <ScrollView
          pagingEnabled
          contentContainerStyle={{
            height: "100%",
          }}
        >
          {/* New course To day */}
          <View>
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 25,
              }}
            >
              <Text style={styles.titleView}>New Course Today</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 40 }}>
              <ScrollView
                pagingEnabled
                contentContainerStyle={{
                  width: screenWidth * listCourse.length,
                }}
              >
                {courseState.results.map((e, index) => (
                  <View
                    style={{
                      width: screenWidth - 80,
                      alignItems: "center",
                      alignContent: "center",
                      paddingBottom: 10,
                    }}
                    key={index}
                  >
                    <Course data={e} width={width} navigator={navigator} />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
          {/* Popular course */}
          {/* <View>
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 25,
              }}
            >
              <Text style={styles.titleView}>Most popular</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 40 }}>
              <ScrollView
                horizontal
                pagingEnabled
                contentContainerStyle={{
                  width: screenWidth * listCourse.length,
                }}
              >
                {listCourse.map((e, index) => (
                  <View
                    style={{
                      width: screenWidth - 80,
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    {e.course}
                  </View>
                ))}
              </ScrollView>
            </View>
          </View> */}
          {/*  */}
          {/* <View>
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 25,
              }}
            >
              <Text style={styles.titleView}>Weekly trend</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 40 }}>
              <ScrollView
                horizontal
                pagingEnabled
                contentContainerStyle={{
                  width: screenWidth * listCourse.length,
                }}
              >
                {listCourse.map((e, index) => (
                  <View
                    style={{
                      width: screenWidth - 80,
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    {e.course}
                  </View>
                ))}
              </ScrollView>
            </View>
          </View> */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
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
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.02,
  },
  seeAll: {
    color: "#024547",
    fontWeight:'500',
  },
});
