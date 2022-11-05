import React, { Component, useEffect, useState } from "react";
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
} from "react-native";
import DiscussionInput from "./DiscussionInput";
import { TextInput } from "react-native-paper";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { DeleteDiscussion } from "../actions/discussionAction";
const Discussion = ({props}) =>{
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const lesson = useSelector((state) => state.lesson);
  const [reply, setReply] = useState(false);
  const [hide, setHide] = useState(true);
  const deleteDiscussion = (discussion_id) => {
    dispatch(
      DeleteDiscussion({
        course_id: lesson.chapter.course,
        chapter_id: lesson.chapter.id,
        lesson_id: lesson.id,
        discussion_id: discussion_id,
      })
    );
  };
  const renderDiscussions = () => {
    if (props.child_discussions.length >= 1) {
      return (
        <View style={{ flexDirection: "column", paddingTop: 12}}>
          {props.child_discussions.map((e, index) => {
            return (
              <View key={index} style={{ flexDirection: "row" }}>
                <View
                  style={{ width: "25%", alignItems: "center", minHeight: 60 }}
                >
                  <Image
                    style={styles.avatar}
                    source={{
                      uri:
                        e.user.avatar ||
                        "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
                    }}
                  ></Image>
                </View>
                <View
                  style={{ width: "75%", minHeight: 60 }}
                >
                  <Text
                    style={{
                      width: "100%",
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "flex-start",
                        justifyContent: "flex-start",
                        fontWeight: "700",
                        marginRight: 12,
                      }}
                    >
                      {e.user.full_name}
                    </Text>
                    <Text> {e.content}</Text>
                  </Text>
                  <View style={{flexDirection:"row",alignContent:"flex-start",alignItems:"flex-start",justifyContent:"flex-start"}}>
                    <View>
                      <Text
                        style={{
                          fontStyle: "italic",
                          opacity: 0.5,
                          fontSize:12
                        }}
                      >
                        {e.time_comment.split(",")[0]  }
                      </Text>
                    </View>
                    <View>
                      {user.id == props.user.id ? (
                        <TouchableOpacity
                          onPress={() => {
                            deleteDiscussion(e.id);
                          }}
                        >
                          <Text style={{ color:"gray", fontWeight: "500",  fontStyle: "italic",  opacity: 0.5, fontSize:12}}>  Delete</Text>
                        </TouchableOpacity>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      );
    }
  };

  useEffect(() => {
    setReply(false);
  }, [lesson]);
  return (
    <View>
      <View>
        <View
          style={{
            width: "100%",
            alignSelf: "center",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 8,
          }}
        >
          <View style={{ width: "25%", alignItems: "center", minHeight: 60 }}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
              }}
            ></Image>
          </View>
          <View
            style={{
              width: "75%",
              minHeight: 60,
            }}
          >
            <Text
              style={{
                width: "100%",
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  alignSelf: "flex-start",
                  justifyContent: "flex-start",
                  fontWeight: "700",
                  marginRight: 8,
                }}
              >
                {props.user.full_name}
              </Text>
              <Text> </Text>
              {props.content}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontStyle: "italic",
                  opacity: 0.5,
                  alignSelf: "flex-start",
                  fontSize: 12,
                }}
              >
                <Text>{props.time_comment.split(",")[0]} </Text>
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontWeight: "500",
                  paddingLeft: 8,
                  fontStyle: "italic",
                  opacity: 0.5,
                  fontSize: 12,
                }}
                onPress={() => {
                  reply ? setReply(false) : setReply(true);
                }}
              >
                Reply
              </Text>
              {user.id == props.user.id ? (
                <TouchableOpacity
                  onPress={() => {
                    deleteDiscussion(props.id);
                  }}
                >
                  <Text
                    style={{
                      color: "gray",
                      fontWeight: "500",
                      paddingLeft: 8,
                      fontStyle: "italic",
                      opacity: 0.5,
                      fontSize: 12,
                    }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingLeft: 28 }}>
        {reply ? (
          <View style={{ paddingTop: 12 }}>
            <DiscussionInput
              props={{
                course_id: lesson.chapter.course,
                chapter_id: lesson.chapter.id,
                lesson_id: lesson.id,
                parent_discussion_id: props.id,
              }}
            ></DiscussionInput>
          </View>
        ) : (
          <></>
        )}
        {props.child_discussions.length >= 1 ? (
          <TouchableOpacity
            onPress={() => {
              hide ? setHide(false) : setHide(true);
            }}
          >
            {hide ? (
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 15,
                  justifyContent: "center",
                }}
              >
                <View style={[styles.line, { marginRight: 8 }]}></View>
                <Text style={styles.showComment}>
                  Show comment ({props.child_discussions.length})
                </Text>
                <View style={[styles.line, { marginLeft: 8 }]}></View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 15,
                  justifyContent: "center",
                }}
              >
                <View style={[styles.line, { marginRight: 8 }]}></View>
                <Text style={styles.showComment}>Hide comment</Text>
                <View style={[styles.line, { marginLeft: 8 }]}></View>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {hide ? <></> : renderDiscussions()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  line: {
    height: 1,
    width: 25,
    backgroundColor: "#D1D1D1",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  showComment: {
    paddingTop: 8,
    alignSelf: "center",
    fontStyle: "italic",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
  },
});
export default Discussion;