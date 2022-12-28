import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity,  Dimensions, ScrollView, } from "react-native";
import { TextInput } from "react-native-paper";
import tw from "tailwind-react-native-classnames";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "../../const/color";
import Course from "../../components/Course";

const SearchScreen = () => {
  const [search,setSearch] = useState('');
  const course = useSelector((state) => state.courses.results);
  const [searchCourse,setSearchCourse] = useState(course)  
  const { width } = Dimensions.get("window");
  const onSearchChange = (searchText) =>{
    setSearch(searchText);
  }
  useEffect(() => {
    if (search == "") {
      setSearchCourse([]);
    } else {
      setSearchCourse(course.filter((course)=>(
        course.title.toLowerCase().includes(search.toLowerCase()) 
      )));
    }
  }, [search]);
  return (
    <View>
      <View style={{ padding: 25 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <MaterialIcons
            size={20}
            color={COLOR.PRIMARY}
            name="chevron-left"
            width={30}
            style={{ width: 30 }}
          /> */}
          <TextInput
            autoFocus={true}
            activeOutlineColor={COLOR.PRIMARY}
            mode="outlined"
            placeholder="Search"
            editable={true}
            onChangeText={(text) => {
              setSearch(text);
            }}
            style={{ width: "95%", height: 40 }}
          />
          {/* <AntDesign
            size={20}
            color={COLOR.PRIMARY}
            name="enter"
            width={30}
            style={{ width: 30, marginLeft: 4 }}
          /> */}
        </View>
      </View>
      <ScrollView
        style={{
          width: width,
          marginBottom:90
        }}
      >
        {searchCourse.map((course, index) => {
          return (
            <View
              style={{
                alignItems: "center",
                alignContent: "center",
                paddingBottom: 10,
              }}
              key={index.toString()}
            >
              <Course data={course} width={width} navigator={navigator} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};


export default SearchScreen;

const styles = StyleSheet.create({});
