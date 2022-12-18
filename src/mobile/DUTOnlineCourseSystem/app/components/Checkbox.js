import React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";


import { TouchableOpacity, Text } from "react-native";
import {COLOR} from "../const/color";

const CheckBox = ({
  selected,
  onPress,
  style,
  textStyle,
  size = 30,
  color = COLOR.SECOND,
  text = "",
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    {...props}
  >
    <Icon
      size={size}
      color={color}
      name={selected ? "check-box" : "check-box-outline-blank"}
    />

  </TouchableOpacity>
);

export default CheckBox;
