import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Chip } from "react-native-paper";
import COLOR from "../const/color";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TouchableRipple,
} from "react-native-paper";
import { getAvatar } from "../../utils/avatar";
import { useNavigation } from "@react-navigation/native";
import { getCourse } from "../actions/courseAction";
import { useDispatch } from "react-redux";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const EnrolledCourse = ({ props }) => {
  console.log(props);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { courseProcess } = props;
  return (
    <View
      style={[
        styles.boxShadow,
        styles.borderComponent,
        { marginTop: 12, backgroundColor: "#fff" },
      ]}
    >
      <TouchableOpacity
        onPress={(data) => {
          dispatch(getCourse({ course_slug: courseProcess.course.slug }));
          navigation.navigate("DetailCourse", {
            course_id: courseProcess.course.id,
          });
        }}
      >
        <View>
          <View style={styles.contentComponent}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              {courseProcess.course.title}
            </Text>
          </View>
          <Image
            style={styles.image}
            source={{
              uri:
                courseProcess.course.background ||
                "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
            }}
          ></Image>
          <View style={{ width: "100%" }}>
            <Card.Title
              titleVariant="titleSmall"
              titleStyle={{ lineHeight: 40 }}
              title={courseProcess.course.user.full_name}
              subtitle={"Last learn date: " + courseProcess.last_learn_date}
              subtitleStyle={{}}
              left={(props) => (
                <Avatar.Image
                  size={40}
                  source={{
                    uri: courseProcess.course.user.avatar || getAvatar(),
                  }}
                />
              )}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EnrolledCourse;

const styles = StyleSheet.create({
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "justify",
    width: "100%",
  },
  avatar: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
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
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    top: -2,
  },
  borderComponent: {
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 8,
  },
});
