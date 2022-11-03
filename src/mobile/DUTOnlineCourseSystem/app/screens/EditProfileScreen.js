import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Alert
} from "react-native";
import DatePickerAndroid from "@react-native-community/datetimepicker";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect, useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { updateProfileUser, resetErrorUser } from "../actions/userAction";
import { launchImageLibrary } from "react-native-image-picker";
const EditProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [full_name,setFull_name] = useState(user.full_name)
  const [bio, setBio] = useState(user.bio);
  const [birthday, setBirthday] = useState(new Date(user.birthday));
  const email = user.account.email;
  const dispatch = useDispatch();
  const [error,setError] = useState("");
  const user_error = user.error;
  const isLoading = user.isLoading;
  const [showDatePicker, setShowDatePicker] = useState(false);
  useEffect(() => {
    dispatch(resetErrorUser());
    console.log(birthday)
    // setError(user.error);
  }, []);
  const handleSave = () =>{ 
    if (full_name == ""){
      setError("Please input full name");
      return;
    }
    if (bio == ""){
      setError("Please input bio");
      return;
    }
    const day = birthday.getFullYear().toString() + "-"+(birthday.getMonth()+1).toString()+"-"+(birthday.getDate()).toString()
    console.log(day);
    setError("");
    
    dispatch(updateProfileUser({full_name,day,bio}));
    // Alert.alert("You need to...");
  }
  const onDateChange = (event,selectedDate) =>{
    setShowDatePicker(false)
    const currentDay = selectedDate || birthday;
    console.log("@@@DayChange",selectedDate);
    setBirthday(selectedDate);
  }
  return (
    <ScrollView style={{ padding: 25 }}>
      <View style={styles.contentComponent}>
        <View style={{ flexDirection: "row", minHeight: 60 }}>
          <View style={{ width: "30%", alignItems: "center", minHeight: 60 }}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
              }}
            ></Image>
          </View>
          <View
            style={{
              width: "70%",
              paddingLeft: 10,
              minHeight: 60,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {user.full_name}
            </Text>
            <Text style={{}}>{user.role}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.contentComponent, styles.spaceBetweenComponent]}>
        <View style={tw`mt-4`}>
          <View style={styles.labelContainer}>
            <Text style={{ color: "#024547", fontWeight: "700" }}>
              Full name
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter full name"
              style={{ placeholderTextColor: "#FFFFFF" }}
              defaultValue={full_name}
              editable={true}
              onChangeText={(text) => {
                setFull_name(text);
                dispatch(resetErrorUser());
              }}
            />
          </View>
        </View>
        <View style={tw`mt-6`}>
          <View style={styles.labelContainer}>
            <Text style={{ color: "#024547", fontWeight: "700" }}>Email</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter email"
              style={{ placeholderTextColor: "#FFFFFF" }}
              defaultValue={email}
              editable={false}
            />
          </View>
        </View>
        <View style={tw`mt-6`}>
          <View style={styles.labelContainer}>
            <Text style={{ color: "#024547", fontWeight: "700" }}>
              Birthday
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text
              onPress={() => {
                setShowDatePicker(true);
                console.log(birthday.toDateString());
              }}
            >
              {birthday.toDateString()}
            </Text>
            {showDatePicker && (
              <DatePickerAndroid
                testID="datetimepicker"
                value={birthday}
                onChange={onDateChange}
                mode="date"
                modal
                androidVariant="nativeAndroid"
                // onChange={(date) => {
                //   // setBirthdayIsOpen(false);
                //   setBirthday(date);
                // }}
                display="default"
                // onSubmit={() => setShowDatePicker(false)}
                onCancel={() => {
                  // setBirthdayIsOpen(false);
                }}
                textColor="gray"
              />
            )}
          </View>
        </View>
        <View style={tw`mt-6`}>
          <View style={styles.labelContainer}>
            <Text style={{ color: "#024547", fontWeight: "700" }}>Bio</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Enter your bio"
              style={{ placeholderTextColor: "#FFFFFF" }}
              value={bio}
              onChangeText={(text) => {
                setBio(text);
                dispatch(resetErrorUser());
              }}
            />
          </View>
        </View>
        <Text style={tw`text-red-600 font-medium`}>{error || user_error}</Text>
        <View style={{ alignItems: "flex-end", marginTop: 12 }}>
          <TouchableOpacity
            style={{
              width: "40%",
              alignItems: "center",
              backgroundColor: "#024547",
              padding: 12,
              borderRadius: 8,
            }}
            onPress={handleSave}
          >
            <Text title="Save" style={{ fontWeight: "500", color: "white" }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    paddingHorizontal: 3,
    marginStart: 10,
    zIndex: 1,
    elevation: 1,
    shadowColor: "white",
    position: "absolute",
    top: -12,
  },
  avatar: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    paddingHorizontal:24,
    zIndex: 0,
    color:"#024547",
    borderColor:"#024547",
    fontSize:12
  },
  spaceBetweenComponent: {
    marginTop: 25,
  },
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "justify",
    width: "100%",
  },
});