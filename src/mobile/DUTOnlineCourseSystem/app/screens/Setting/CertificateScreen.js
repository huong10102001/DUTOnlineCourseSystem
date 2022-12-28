import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserInfo from "../../components/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourse from "../../components/EnrolledCourse";
import { Button, TextInput } from "react-native-paper";
import { changePassword } from "../../actions/userAction";
import { WebView } from "react-native-webview";

const CertificateScreen = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <ScrollView style={{ padding: 25, paddingBottom: 200 }}>
      <UserInfo props={{ user: user }} />
      <View style={styles.spaceBetweenComponent}>
        <View style={styles.contentComponent}>
          <Text style={{fontWeight:'500',color:'#024547'}}>Certificates</Text>
          {user.process_courses.map((course) => {
            if (course.status == "COMPLETED" && course.certificate) {
              return (
                <WebView
                  style={{ flex: 1, height: "100%", minHeight: 150, marginTop:12}}
                  // useWebKit={true}
                  startInLoadingState
                  javaScriptEnabled
                  originWhitelist={["*"]}
                  nestedScrollEnabled
                  scrollEnabled={true}
                  overScrollMode="content"
                  containerStyle={{
                    backgroundColor: "white",
                  }}
                  mediaPlaybackRequiresUserAction={true}
                  source={{
                    uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${
                      course.certificate.split("pdf?")[0]
                    }pdf`,
                  }}
                />
              );
            }
          })}
        </View>
      </View>
      <View
        style={[styles.spaceBetweenComponent, { paddingBottom: 50 }]}
      ></View>
    </ScrollView>
  );
};
export default CertificateScreen;

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
