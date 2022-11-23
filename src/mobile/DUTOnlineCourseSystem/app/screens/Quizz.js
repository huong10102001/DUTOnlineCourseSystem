import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getCourseProcess } from "../actions/courseProcessAction";
import QuizzOneChoice from "../components/QuizzOneChoice";
import QuizzMultiChoice from "../components/QuizzMultiChoice";
const Quizz = ({ props }) => {
  const dispatch = useDispatch();
  // console.log(props);
  return (
    <ScrollView style={{ padding: 25, paddingBottom: 50 }}>
      <QuizzOneChoice></QuizzOneChoice>
      <View style={styles.spaceBetweenComponent}></View>
      <QuizzMultiChoice></QuizzMultiChoice>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "justify",
    width: "100%",
  },
  spaceBetweenComponent: {
    marginTop: 25,
    width: "100%",
  },
});
export default Quizz;
