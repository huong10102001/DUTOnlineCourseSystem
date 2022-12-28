import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getCourseProcess } from "../actions/courseProcessAction";
import { getCourse } from "../actions/courseAction";
import { getAvatar } from "../../utils/getImage";
const Course = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const course_data = props.data;
  return (
    <TouchableOpacity
      onPress={(data) => {
        dispatch(getCourse({ course_slug: course_data.slug }));
        navigation.navigate("DetailCourse", { course_id: course_data.id });
      }}
      style={[styles.container, styles.boxShadow, { width: props.width }]}
    >
      <View style={{ borderRadius: 5 }}>
        <Image
          style={styles.image} 
          source={{
            uri:
              course_data.background ||
              "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
          }}
        ></Image>
      </View>
      <View
        style={{
          padding: 12,
          alignContent: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={{ width: 80, alignItems: "center" }}>
          <Image
            style={styles.avatar}
            source={{
              uri: course_data.user.avatar||getAvatar(),
            }}
          ></Image>
        </View>
        <View>
          <Text style={styles.title}>{course_data.title}</Text>
          <View
            style={{
              opacity: 0.5,
              flexDirection: "row",
              paddingTop: 4,
              width: props.width - 24 - 80,
            }}
          >
            <FontAwesome
              size={18}
              color="black"
              name="user"
              width={20}
              style={{ width: 20 }}
            />
            <Text style={[styles.text, { width: props.width - 24 - 80 }]}>
              {course_data.user.full_name}
            </Text>
          </View>
          <View style={{ flexShrink: 1, width: props.width - 24 - 80 }}>
            <Text
              style={[
                styles.text,
                {
                  paddingTop: 4,
                  opacity: 0.5,
                  flexWrap: "wrap",
                },
              ]}
            >
              {course_data.summary}
            </Text>
          </View>

          {/* {checkProcessCourse()} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    position: "relative",
    backgroundColor: "#fff",
    elevation: 2,
  },
  image: {
    width: "105%",
    height: 200,
    borderRadius: 5,
    top: -2,
    left: -2,
  },
  avatar: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 21,
    color: "#024547",
  },
  decription: {
    fontWeight: "400",
    fontSize: 12,
    opacity: 0.6,
    marginVertical: 5,
    textAlign: "justify",
  },
  text: {
    paddingLeft: 4,
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
export default Course;
