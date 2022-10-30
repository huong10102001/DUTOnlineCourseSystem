import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const Course = (props) =>{
  const navigation = useNavigation();
  const course_data = props.data;
  console.log(props);
    return (
      <TouchableOpacity
        onPress={(data) => {
          navigation.navigate("Announce", { course_data:course_data });
        }}
      >
        <View style={styles.container}>
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
            <Text style={styles.title}>{course_data.title}</Text>
            <Text style={styles.decription}>{course_data.decription}</Text>
            <View style={tw`flex flex-row content-center opacity-50 pt-2`}>
              <FontAwesome
                size={18}
                color="black"
                name="user"
                width={20}
                style={{ width: 20 }}
              />
              <Text style={styles.text}>{course_data.user.full_name}</Text>
            </View>
            <View style={tw`flex flex-row opacity-50 pt-2`}>
              <View style={{ width: "50%" }}>
                <View style={tw`flex flex-row content-center`}>
                  <Ionicons
                    size={18}
                    color="black"
                    name="documents"
                    width={20}
                    style={{ width: 20 }}
                  />
                  <Text style={styles.text}>B Class</Text>
                </View>
              </View>
              <View style={{ width: "50%" }}>
                <View style={tw`flex flex-row content-center`}>
                  <Ionicons
                    size={18}
                    color="black"
                    name="time"
                    width={20}
                    style={{ width: 20 }}
                  />
                  <Text style={styles.text}>3 hours</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.buttonPlay}>
            <FontAwesome5
              size={18}
              color="black"
              name="play"
              style={{ paddingLeft: 4 }}
              color="#024547"
            />
          </View>
        </View>
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
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 21,
    color: "#024547",
  },
  decription: {
    fontWeight: 400,
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
    flex:1,
    justifyContent: "center",
    alignContent: "center",
    borderColor: "#024547",
    backgroundColor:'#fff',
    width:50,
    height:50,
    alignItems:'center',
    borderRadius:25,
    top: '42%',
    right:20,
    borderWidth:1,
  },
});
export default Course;