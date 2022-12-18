import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity,Dimensions } from "react-native";
import { TouchableRippleProps } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../components/Rating";
const RatingSection = ({ props }) => {
  const course = useSelector((state) => state.course);
  const [numberViewRating, setNumberViewRating] = React.useState(5);
  const [hideSeeMore, setHideSeeMore] = useState(course.total_rating<=5);
  const renderRatings = () => {
    let number = course.total_rating;
    if (number == 0) {
      return;
    }
    if (number > numberViewRating) {
      number = numberViewRating;
    }
    return course.ratings.slice(0, number).map((e, index) => {
      return (
        <View>
          <Rating props={e}></Rating>
        </View>
      );
    });
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 8,
        }}
      >
        <Text style={styles.title}>Ratings</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "500", paddingRight: 4 }}>
            {course.avg_rating.toString().substring(0,4)}/5
          </Text>
          <FontAwesome
            size={18}
            color="#FFBD35"
            name="star"
            width={20}
            style={{ width: 20 }}
          />
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "gray",
          opacity: 0.5,
          marginBottom: 8,
        }}
      ></View>
      {renderRatings()}
      {!hideSeeMore ? (<TouchableOpacity
        onPress={() => {
          if (hideSeeMore + 5 >= course.total_rating) {
            setHideSeeMore(true);
          }
          setNumberViewRating(numberViewRating + 5);
        }}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.5,
          }}
        >
          <View style={styles.line}></View>  
            <Text style={{ paddingHorizontal: 8, fontStyle: "italic" }}>
              See more
            </Text>
          <View style={styles.line}></View>
        </View>
      </TouchableOpacity>):(<></>)}
    </View>
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
  title: {
    fontWeight: "700",
    alignItems: "center",
    color: "#024547",
  },
  line: {
    width: 30,
    height: 1,
    backgroundColor: "black",
  },
});
export default RatingSection;
