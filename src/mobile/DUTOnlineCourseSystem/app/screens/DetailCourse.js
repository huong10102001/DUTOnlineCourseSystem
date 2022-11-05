import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Chapter from "../components/Chapter";
import { WebView } from "react-native-webview";
import { enRoll } from "../actions/processAction";
import { connect, useDispatch, useSelector } from "react-redux";
import RenderHtml from "react-native-render-html";
import { getCourse } from "../actions/courseAction";
import { getCourseProcess } from "../actions/courseProcessAction";
const DetailCourse = ({ route, navigation }) => {
  const { course_id } = route.params;
  console.log(course_id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourse({ course_id: course_id }));
  }, []);
  const course_data = useSelector((state) => state.course);
  const props = {
    author: "Dương Anh Tuấn",
    url: "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
    title: "Python for Everybody Specialization",
    sumary:
      "Learn to Program and Analyze Data with Python. Develop programs to gather, clean, analyze, and visualize data.",
    star: 4.8,
    ratings: "195.000",
    whatWillYouLearn:
      "Learn to Program and Analyze Data with Python. Develop programs to gather, clean, analyze, and visualize data.",
  };
  return (
    <ScrollView style={{ padding: 25, paddingBottom: 50 }}>
      <View style={{ alignItems: "center", marginTop: 25, marginBottom: 50 }}>
        <Image
          style={styles.image}
          source={{
            uri: course_data.background || props.url,
          }}
        ></Image>
        <View style={{ alignItems: "flex-start" }}>
          <Text style={[styles.title, styles.spaceBetweenComponent]}>
            {course_data.title}
          </Text>
        </View>
        <View style={[styles.contentComponent, styles.spaceBetweenComponent]}>
          <Text style={{ textAlign: "justify" }}>{course_data.summary}</Text>
        </View>
        <View style={{ alignItems: "center", width: "100%" }}>
          <View style={[styles.contentComponent, styles.spaceBetweenComponent]}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <FontAwesome
                size={18}
                color="#FFBD35"
                name="star"
                width={20}
                style={{ width: 20 }}
              />
              <FontAwesome
                size={18}
                color="#FFBD35"
                name="star"
                width={20}
                style={{ width: 20 }}
              />
              <FontAwesome
                size={18}
                color="#FFBD35"
                name="star"
                width={20}
                style={{ width: 20 }}
              />
              <FontAwesome
                size={18}
                color="#FFBD35"
                name="star"
                width={20}
                style={{ width: 20 }}
              />
              <FontAwesome
                size={18}
                color="#FFBD35"
                name="star"
                width={20}
                style={{ width: 20 }}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 8,
              }}
            >
              <Text
                style={{ color: "#FFBD35", fontWeight: "600", marginRight: 8 }}
              >
                {props.star}
              </Text>
              <Text style={{}}>{props.ratings} ratings</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.spaceBetweenComponent,{justifyContent:"center",alignItems:"center"}]}
          onPress={() => {
            dispatch(getCourseProcess({ course_id: course_data.id }));
            navigation.navigate("Lesson");
          }}
        >
          <View style={[styles.btnEnroll, { width: "100%",alignSelf:"center", alignItems:"center"}]}>
            <Text style={{ color: "white", fontWeight: "700"}}>
              Enroll now
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={
            ({ alignItems: "center", width: "100%" },
            [styles.contentComponent, styles.spaceBetweenComponent])
          }
        >
          <RenderHtml source={{ html: `${course_data.description}` }} />
        </View>
        <View
          style={
            ({ alignItems: "center", width: "100%" },
            [styles.contentComponent, styles.spaceBetweenComponent])
          }
        >
          <Text
            style={{ color: "#024547", fontWeight: "700", marginBottom: 16 }}
          >
            {course_data.user.full_name}
          </Text>
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "30%", alignItems: "center" }}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
                  }}
                ></Image>
              </View>
              <View style={{ width: "70%" }}>
                <Text style={{ marginBottom: 16, textAlign: "justify" }}>
                  {props.whatWillYouLearn}
                </Text>
              </View>
            </View>
            <Text style={styles.textJustifyPadding}>
              {props.whatWillYouLearn}
            </Text>
            <Text style={{ textAlign: "justify" }}>
              {props.whatWillYouLearn}
            </Text>
          </View>
        </View>
        <View
          style={
            ({ alignItems: "center", width: "100%", marginBottom: 100 },
            [styles.contentComponent, styles.spaceBetweenComponent])
          }
        >
          <Text
            style={{ color: "#024547", fontWeight: "700", marginBottom: 16 }}
          >
            Earn a Certificate upon completion
          </Text>
          <Text style={styles.textJustifyPadding}>
            {props.whatWillYouLearn}
          </Text>
          <Image
            style={styles.image}
            source={{
              uri: "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
            }}
          ></Image>
        </View>
        <View style={{ alignItems: "flex-start" }}>
          <Text style={[styles.title, styles.spaceBetweenComponent]}>
            {course_data.chapters.length} Chapters in this Specialization
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          {course_data.chapters.map((e, index) => (
            <View style={{ paddingBottom: 20 }}>
              <Chapter key={index} props={[e, index]} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default DetailCourse;
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 158,
    borderRadius: 5,
    top: -2,
    left: -2,
  },
  spaceBetweenComponent: {
    marginTop: 25,
    width: "100%",
  },
  title: {
    fontWeight: "700",
    alignItems: "center",
  },
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    // alignItems:''
    textAlign: "justify",
    width: "100%",
  },
  btnEnroll: {
    backgroundColor: "#024547",
    padding: 16,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textJustifyPadding: {
    marginBottom: 16,
    textAlign: "justify",
  },
});
