import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const Chapter = ({props})=>{
    const datas = props.props
    console.log(props);
    const data = {
      description:
        "Learn to Program and Analyze Data with Python. Develop programs to gather, clean, analyze, and visualize data.",
    };
    return (
      <View style={styles.contentComponent}>
        <Text
          style={{
            fontSize: 14,
            color: "#024547",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Chap {props[1]}: {props[0].title}
        </Text>
        <Text
          style={{
            textAlign: "justify",
            fontSize: 12,
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          {data.description}
        </Text>
        <View style={{ flexDirection: "row", alignContent: "space-around", justifyContent:'center',flexWrap:'wrap'}}>
          {props[0].lessons.map((e, index) => {
            return (
              <View
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#D9D9D9",
                  borderRadius: 28,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 8,
                  marginBottom: 8,
                  key:{index}
                }}
              >
                <Text style={{ fontSize: 10 }}>{index + 1}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
    
}
export default Chapter;
const styles = StyleSheet.create({
  spaceBetweenComponent: {
    marginTop: 25,
    width: "100%",
  },
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    // alignItems:''
    textAlign: "justify",
    width: "100%",
  },
});