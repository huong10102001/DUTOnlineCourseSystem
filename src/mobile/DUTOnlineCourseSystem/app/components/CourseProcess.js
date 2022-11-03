import { Text, View, StyleSheet, Image } from 'react-native';
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const CourseProcess = ({ props }) =>{
  const [isComplete, setIsComplete] = useState(false);
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
      const state = "100%";
      console.log(state)
      {
        switch (state) {
          case "100%":
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
          case "0%":
            return (
              <View style={styles.coverProgressStart}>
              <Text style={{color:'white', fontWeight:'bold'}}>Start Now</Text>
            </View>
            )
          default:
            // styles.progressBar.width=state
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
    props = state
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, borderRadius: 5 }}>
          <Image
            style={styles.image}
            source={{
              uri: props.url,
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
          <Text style={styles.title}>{props.name}</Text>
          <View style={tw`flex flex-row content-center opacity-50 pt-2`}>
            <FontAwesome
              size={18}
              color="black"
              name="user"
              width={20}
              style={{ width: 20 }}
            />
            <Text style={styles.text}>{props.author}</Text>
          </View>
          {checkProcessCourse()}
        </View>

        <View style={styles.buttonPlay}>{checkIconComplete()}</View>
      </View>
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