import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import DatePickerAndroid from "@react-native-community/datetimepicker";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { connect, useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { updateProfileUser, resetErrorUser } from "../../actions/userAction";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// const ImagePicker = require("react-native-image-picker");
import { TextInput } from "react-native-paper";
import { updateAvatarUser } from "../../actions/userAction";
import { COLOR, COLOR_BORDER } from "../../const/color";
// import * as ImagePicker from "expo-image-picker";
import { getAvatar } from "../../../utils/getImage";

const ImageOptions = {
  title: "select image",
  storageOptions: { skipBackup: true, path: "images" },
  maxWidth: 150,
  maxHeight: 150,
  chooseFromLibraryButtonTitle: "Choose from gallery",
};

const EditProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [full_name, setFull_name] = useState(user.full_name);
  const [bio, setBio] = useState(user.bio);
  const [birthday, setBirthday] = useState(new Date(user.birthday));
  const email = user.account.email;
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const user_error = user.error;
  const isLoading = user.isLoading;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pic, setPic] = useState(
    "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png"
  );
  useEffect(() => {
    dispatch(resetErrorUser());
    console.log(birthday);
    // setError(user.error);
  }, []);
  const handleSave = () => {
    if (full_name == "") {
      setError("Please input full name");
      return;
    }
    if (bio == "") {
      setError("Please input bio");
      return;
    }
    const day =
      birthday.getFullYear().toString() +
      "-" +
      (birthday.getMonth() + 1).toString() +
      "-" +
      birthday.getDate().toString();
    console.log(day);
    setError("");

    dispatch(updateProfileUser({ full_name, day, bio }));
  };
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDay = selectedDate || birthday;
    setBirthday(selectedDate);
  };
  // const uploadImage = () => {
  //   let options = {
  //     mediaType: "photo",
  //     quality: 1,
  //     includeBase64: true,
  //   };
  //   ImagePicker.launchImageLibraryAsync(options, (response) => {
  //     console.log(response)
  //     if (response.didCancel) {
  //       console.warn("DIDCANCEL");
  //     } else {
  //       setPic("data:image/png;base64, " + response.assets[0].base64);
  //       console.warn(pic);
  //       let formData = new FormData();
  //       formData.append("avatar", result.assets[0].base64);
  //       dispatch(updateAvatarUser({ data: formData }));
  //     }
  //   });
  // };
  // const pickImage = async () => {

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //     let formData = new FormData()
  //     formData.append("avatar", result.assets[0]);
  //     console.log(formData);
  //     dispatch(updateAvatarUser({data:formData}));
  //   }
  // };
  const [image, setImage] = useState(null);

  const handleUpdate = async () => {
    let result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    },()=>{});
    // if(result.canceled){

    // }
    // else{
    //   console.log(result)
    //   setImage(result.assets[0].uri)
    //   let formData = new FormData();
    //   formData.append("avatar", {
    //     uri: result.assets[0].uri,
    //     type: result.assets[0].type,
    //   });
    //   console.log(formData);
    //   // dispatch(updateAvatarUser({ data: formData }));
    // }
    // ImagePicker.showImagePicker(ImageOptions, (response) => {
    //   console.log("Image Response = ", response);
    //   if (response.didCancel) {
    //     console.log("User cancelled image picker");
    //   } else if (response.error) {
    //     console.log("ImagePicker Error: ", response.error);
    //   } else if (response.customButton) {
    //     console.log("User tapped custom button: ", response.customButton);
    //   } else {
    //     const source = {
    //       filename: response.fileName,
    //       type: response.type,
    //       uri: response.fileSize,
    //     };
    //     const self = this;
    //     const userId = "";
    //     console.log("source", source);

    //     let formData = new FormData();
    //     formData.append("filename", source);

        // console.log('UPLOADImage====111334')
        // () => {
          axios({
            method: "PUT",
            url: "http://localhoast:8090/api/UploadProfilePic",
            formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((response) => {
              console.log("response", response);
              if (response.status === 200) {
                console.log("status 200", response);
                // alert("submitted", "");
              }
            })
            .catch((error) => {
              console.log("error res", response);
              // self.setState({ spinnerBool: false, MyProfileResp: "" }, () => {
              //   alert("Error,Message Not submitted");
              //   console.log("Error", error.response);
              // });
            });
        // };
        // this.setState({ spinnerBool: true }, );
      // }
    // });
  }
  return (
    <ScrollView style={{ padding: 25 }}>
      <TouchableOpacity onPress={handleUpdate}>
        <View style={styles.contentComponent}>
          <View style={{ flexDirection: "row", minHeight: 60 }}>
            <View style={{ width: "30%", alignItems: "center", minHeight: 60 }}>
              <Image
                style={styles.avatar}
                source={{
                  uri: image || user.avatar || getAvatar(),
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
      </TouchableOpacity>
      <View style={[styles.contentComponent, styles.spaceBetweenComponent,{marginBottom:50}]}>
        <View style={tw`mt-4`}>
          <TextInput
            label={"Full name"}
            activeOutlineColor={COLOR.PRIMARY}
            outlineColor={COLOR.PRIMARY}
            mode="outlined"
            placeholder="Full name"
            defaultValue={full_name}
            editable={true}
            onChangeText={(text) => {
              setFull_name(text);
              dispatch(resetErrorUser());
            }}
          />
        </View>
        <View style={tw`mt-6`}>
          <TextInput
            label={"Email"}
            outlineColor={COLOR.PRIMARY}
            activeOutlineColor={COLOR.PRIMARY}
            mode="outlined"
            placeholder="Enter email"
            defaultValue={email}
            editable={false}
            onChangeText={(text) => {
              setFull_name(text);
              dispatch(resetErrorUser());
            }}
          />
        </View>
        <View style={tw`mt-6`}>
          <TouchableOpacity
            onPress={() => {
              setShowDatePicker(true);
            }}
          >
            <TextInput
              label={"Birthday"}
              outlineColor={COLOR.PRIMARY}
              activeOutlineColor={COLOR.PRIMARY}
              mode="outlined"
              placeholder="Enter email"
              editable={false}
              value={birthday.toDateString()}
            />
            {showDatePicker && (
              <DatePickerAndroid
                testID="datetimepicker"
                value={birthday}
                onChange={onDateChange}
                mode="date"
                modal
                androidVariant="nativeAndroid"
                display="default"
                textColor="gray"
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={tw`mt-6`}>
          <TextInput
            multiline={true}
            activeOutlineColor={COLOR.PRIMARY}
            outlineColor={COLOR.PRIMARY}
            label={"Bio"}
            numberOfLines={4}
            placeholder="Bio"
            mode="outlined"
            value={bio}
            onChangeText={(text) => {
              setBio(text);
              dispatch(resetErrorUser());
            }}
          />
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
    paddingHorizontal: 24,
    zIndex: 0,
    color: "#024547",
    borderColor: "#024547",
    fontSize: 12,
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
