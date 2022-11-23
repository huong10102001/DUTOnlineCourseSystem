import React, { Component, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Button,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  // TextInput,
} from "react-native";
import { TextInput } from "react-native-paper";
import { WebView } from "react-native-webview";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { CreateDiscussion } from "../actions/discussionAction";
const DiscussionInput = ({ props }) => {
  const dispatch = useDispatch();
  const [discussion,setDiscussion] = useState("");
  const [error,setError]= useState("");
  const createDiscussionOnPress = () =>{
    if(discussion==""){
      setError("Please input comment");
    }
    else{
      dispatch({
        type:"CREATE_DISCUSSION",
        payload:{
          course_id: props.course_id,
          lesson_id: props.lesson_id,
          chapter_id: props.chapter_id,
          parent_discussion_id: props.parent_discussion_id,
          content: discussion
        }
      }
        // CreateDiscussion({
          
        // })
      );
    }
  }
  const uploadImage = () => {
    let options = {
      mediaType: "photo",
      quality: 1,
      includeBase64: true,
      fileName: "",
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        setPic(false);
      } else {
        setPic("data:image/png;base64, " + response.assets[0].base64);
        console.warn(response);
      }
    });
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "25%", alignItems: "center", minHeight: 60 }}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
          }}
        ></Image>
      </View>
      <View style={{ width: "75%", alignItems: "center", minHeight: 60 }}>
        <TextInput
          onChangeText={(text) => {
            setError("")
            setDiscussion(text);
          }}
          multiline={true}
          numberOfLines={2}
          activeUnderlineColor="#024547"
          selectionColor="#024547"
          underlineColor="#F2F2F2"
          activeOutlineColor="#024547"
          // theme={{ fonts: { regular: "Roboto" } }}
          style={{
            fontSize: 14,
            width: "100%",
            borderRadius: 8,
            backgroundColor: "#F2F2F2",
            marginBottom:6
          }}
        ></TextInput>
        {error?<Text style={{color:"red" ,fontStyle: "italic"}}>{error}</Text>:<></>}
        <View
          style={[
            styles.buttonCover,
            { width: "100%", justifyContent: "flex-end" },
          ]}
        >
          <TouchableOpacity onPress={() => {
            if (discussion == "") {
              setError("Please input comment");
            } else {
              dispatch(
                {
                  type: "CREATE_DISCUSSION",
                  payload: {
                    course_id: props.course_id,
                    lesson_id: props.lesson_id,
                    chapter_id: props.chapter_id,
                    parent_discussion_id: props.parent_discussion_id,
                    content: discussion,
                  },
                }
              );
            }
          }}>
            <View
              style={{
                marginRight: 12,
                width: 40,
                height: 40,
                backgroundColor: "#024547",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather
                size={18}
                color="#024547"
                name="send"
                width={20}
                style={{
                  width: 20,
                  color: "white",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default DiscussionInput;
const styles = StyleSheet.create({
  avatar: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    backgroundColor: "#024547",
    borderRadius: 8,
    width: "42%",
    color: "white",
    fontWeight: "600",
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonCover: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
