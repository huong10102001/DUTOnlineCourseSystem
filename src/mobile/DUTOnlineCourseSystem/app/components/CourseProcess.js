import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { PROCESS_STATUS } from "../const/processStatus";
import { getCourse } from "../actions/courseAction";
import { useDispatch } from "react-redux";
import { getAvatar } from "../../utils/getImage";
import { ProgressBar, MD3Colors } from "react-native-paper";

const CourseProcess = ({ props, width }) => {
  const dispatch = useDispatch();
  const [isComplete, setIsComplete] = useState(false);
  const navigation = useNavigation();
  const progress = () => {
    let count = 0;
    for (let i = 0; i < props.chapters.length; i++) {
      count = count + props.chapters[i].lessons.length;
    }
    return props.lessons_completed / count;
  };

  const checkIconComplete = () => {
    if (!isComplete) {
      return (
        <FontAwesome5
          size={18}
          color="black"
          name="play"
          style={{ paddingLeft: 4 }}
          color="#024547"
        />
      );
    } else {
      return (
        <MaterialIcons
          size={22}
          color="black"
          name="done-all"
          color="#024547"
        />
      );
    }
  };


  return (
    <TouchableOpacity
      style={[styles.container, { width: width }]}
      onPress={(data) => {
        dispatch(getCourse({ course_slug: props.slug }));
        navigation.navigate("DetailCourse", { course_id: props.id });
      }}
    >
      <View>
        <Image
          style={styles.image}
          source={{
            uri: props.background,
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
              uri: props.user.avatar || getAvatar(),
            }}
          ></Image>
        </View>
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <View
            style={{
              opacity: 0.5,
              flexDirection: "row",
              paddingTop: 4,
              width: width - 24 - 80,
            }}
          >
            <FontAwesome
              size={18}
              color="black"
              name="user"
              width={20}
              style={{ width: 20 }}
            />
            <Text style={[styles.text, { width: width - 24 - 80 }]}>
              {props.user.full_name}
            </Text>
          </View>
          <View style={{ flexShrink: 1, width: width - 24 - 80 }}></View>
          <ProgressBar
            progress={progress()}
            color="#024547"
            style={{ height: 5, width: "90%", marginTop: 8 }}
          />
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
  logo: {
    width: 66,
    height: 58,
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
  buttonPlay: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    borderColor: "#024547",
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 25,
    top: "42%",
    right: 20,
    borderWidth: 1,
  },
  coverProgress: {
    height: 30,
    borderRadius: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#024547",
    padding: 5,
  },
  coverProgressComplete: {
    height: 30,
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: "#07B464",
    justifyContent: "center",
    alignItems: "center",
  },
  coverProgressStart: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#024547",
    marginTop: 10,
    borderRadius: 15,
  },
  progressBar: {
    backgroundColor: "#024547",
    height: "100%",
    borderRadius: 10,
  },
  avatar: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
export default CourseProcess;
