import React, { Component } from "react";
import { StyleSheet, Dimensions, Button, View, Text,ScrollView, SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview'
const PDF = () =>{
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <WebView
        style={{ flex: 1, height: "100%", minHeight: 440}}
        useWebKit={true}
        originWhitelist={["*"]}
        nestedScrollEnabled
        scrollEnabled={true}
        overScrollMode="content"
        containerStyle={{
          backgroundColor: "white",
        }}
        mediaPlaybackRequiresUserAction={true}
        source={{
          uri: "http://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf",
        }}
      />
    </ScrollView>
  );
}
export default PDF;

