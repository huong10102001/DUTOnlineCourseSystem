import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { PROCESS_STATUS } from '../const/processStatus';
// import { TouchableOpacity } from 'react-native-gesture-handler';
const CourseProcess = ({ props }) =>{
  const [isComplete, setIsComplete] = useState(false);
  const navigation = useNavigation();
  const numberOfLesson = () =>{
    let count = 0;
    for (let i = 0; i<props.chapters.length;i++){
      count = count + props.chapters[i].lessons.length
    }
    console.log("@@@@",count)
    return count;
  }
  const state = {
    url: "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
    name: "Name of Couse",
    decription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius.",
    author: "DAT",
    class: "B class",
    time: "3 Hours",
    numberOfLession:36,
    isComplete:36,
    };
    console.log(props)
    const checkIconComplete = () =>{
      if(!isComplete){
        return (
          <FontAwesome5
            size={18}
            color="black"
            name="play"
            style={{ paddingLeft: 4 }}
            color="#024547"
          />
        );
      }
      else{
        return (
          <MaterialIcons
            size={22}
            color="black"
            name="done-all"
            color="#024547"
          />
        )
      }
    }
    
    const checkProcessCourse = (isComplete, numberOfLession) => {
      const state = "0%";
      console.log(state)
      {
        switch (props.process_status) {
          case PROCESS_STATUS.COMPLETED:
            React.useEffect(() => {
              setIsComplete(true);
            }, []);
            return (
              <View style={styles.coverProgressComplete}>
                <Text style={{ color: "white", fontWeight: '700' }}>
                  Complete
                </Text>
              </View>
            );
          case PROCESS_STATUS.OPEN:
            return (
              <View style={styles.coverProgressStart}>
              <Text style={{color:'white', fontWeight:'bold'}}>Start Now</Text>
            </View>
            )
          case PROCESS_STATUS.IN_PROGRESS:
            let lesson_completed = props.lessons_completed;
            let number_of_lesson = numberOfLesson();
            let percent = lesson_completed/number_of_lesson*100
            let percent_string = percent.toString()+"%"
            return (
              <View style={styles.coverProgress}>
                <View
                  style={{
                    backgroundColor: "#024547",
                    height: "100%",
                    borderRadius: 10,
                    width: { percent_string },
                  }}
                ></View>
              </View>
            );
          default:
            return (
              <View style={styles.coverProgress}>
                <View
                  style={{
                    backgroundColor: "#024547",
                    height: "100%",
                    borderRadius: 10,
                    width:{state}
                  }}
                ></View>
              </View>
            );
        }
      }
    };
    // props = state
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={(data) => {
          navigation.navigate("DetailCourse", { course_id: props.id });
        }}
      >
        <View style={{ flex: 1, borderRadius: 5 }}>
          <Image
            style={styles.image}
            source={{
              uri: props.background,
            }}
          ></Image>
        </View>
        <View
          style={{
            flex: 1,
            padding: 12,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>{props.title}</Text>
          <View
            style={tw`flex flex-row content-center opacity-50 pt-2 items-center`}
          >
            <FontAwesome
              size={18}
              color="black"
              name="user"
              width={20}
              style={{ width: 20 }}
            />
            <Text style={styles.text}>{props.user.full_name}</Text>
          </View>
          {checkProcessCourse()}
        </View>

        <View style={styles.buttonPlay}>{checkIconComplete()}</View>
      </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
  container: {
    height: 324,
    width: 268,
    borderColor: "#024547",
    borderWidth: 2,
    borderBottomWidth: 10,
    borderRadius: 5,
    position: "relative",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    elevation: 2,
    shadowColor: "#000",
  },
  image: {
    width: 268,
    height: 158,
    position: "absolute",
    borderRadius: 5,
    top: -2,
    left: -2,
  },
  logo: {
    width: 66,
    height: 58,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 21,
    color: "#024547",
  },
  decription: {
    fontWeight: '400',
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
});
export default CourseProcess;