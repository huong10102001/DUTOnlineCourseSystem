import * as React from "react";
import { View } from "react-native";
import { Chip} from "react-native-paper";
import COLOR from "../const/color";

const Tag = ({props}) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Chip mode="outlined" style={{backgroundColor:props.type}}>{props.content}</Chip>
      </View>
    );
}

export default Tag;
