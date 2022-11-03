import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
const DetailCourse = ({ route,navigation }) => {
  const {course_data} = route.params;
  console.log(course_data.background);
  const props = {
    author:"Dương Anh Tuấn",
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
    <ScrollView style={{ padding: 25,paddingBottom:50 }}>
      <View style={{ alignItems: "center",marginTop:25,marginBottom:50 }}>
        <Image
          style={styles.image}
          source={{
            uri: course_data.background,
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
        <View style={[styles.spaceBetweenComponent, styles.btnEnroll]}>
          <Text style={{ color: "white", fontWeight: "700" }}>Enroll now</Text>
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
            What will you learn
          </Text>
          <Text style={{ marginBottom: 16, textAlign: "justify" }}>
            {course_data.summary}
          </Text>
          <Text style={{ marginBottom: 16, textAlign: "justify" }}>
            {course_data.summary}
          </Text>
          <Text style={{ textAlign: "justify" }}>{course_data.summary}</Text>
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
            <Text style={{textAlign:"justify"}}>{props.whatWillYouLearn}</Text>
          </View>
        </View>
        <View
          style={
            ({ alignItems: "center", width: "100%",marginBottom:100 },
            [styles.contentComponent, styles.spaceBetweenComponent])
          }
        >
          <Text
            style={{ color: "#024547", fontWeight: "700", marginBottom: 16 }}
          >
            Earn a Certificate upon completion
          </Text>
          <Text style={styles.textJustifyPadding}>{props.whatWillYouLearn}</Text>
          <Image
            style={styles.image}
            source={{
              uri: "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
            }}
          ></Image>
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
