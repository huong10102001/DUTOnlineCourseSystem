import React, { Component } from "react";
import { StyleSheet, Dimensions, Button, View, Text,ScrollView, SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview'
const PDF = (props) =>{
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <WebView
        style={{ flex: 1, height: "100%", minHeight: 440 }}
        // useWebKit={true}
        startInLoadingState
        javaScriptEnabled
        originWhitelist={["*"]}
        nestedScrollEnabled
        scrollEnabled={true}
        overScrollMode="content"
        containerStyle={{
          backgroundColor: "white",
        }}
        mediaPlaybackRequiresUserAction={true}
        source={{
          uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${props.props.attachment?.file?.split('pdf?')[0]}pdf`,
        }}
      />
    </ScrollView>
  );
}
export default PDF;

