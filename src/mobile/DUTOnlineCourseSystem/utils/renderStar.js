import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
const renderStar = (numberStart) => {
  star = Math.round(numberStart);
  return [1, 2, 3, 4, 5].map((e, index) => {
    if (e <= star) {
      return (
        <FontAwesome
          size={18}
          color="#FFBD35"
          name="star"
          width={20}
          style={{ width: 20 }}
        />
      );
    }
    return (
      <AntDesign
        size={18}
        color="#FFBD35"
        name="staro"
        width={20}
        style={{ width: 20 }}
      />
    );
  });
};
export default renderStar;
