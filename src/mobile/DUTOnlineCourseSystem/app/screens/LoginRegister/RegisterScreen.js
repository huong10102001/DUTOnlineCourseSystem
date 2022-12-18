import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView,TouchableHighlight} from 'react-native'
import tw from 'tailwind-react-native-classnames';
import React, { useState } from 'react'
// import { Checkbox } from 'react-native-paper';
// import CheckBox from "react-native-checkbox";
import CheckBox from '../../components/Checkbox';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {registerAction} from '../../actions/registerAction';
import {connect, useDispatch, useSelector} from 'react-redux';
import COLOR from '../../const/color';
const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const error_api = useSelector((state)=>state.regis.error)
      const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = useState(false);
    const [role, setRole] = useState("user");
    const [fullName,setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const register = () =>{
        if(fullName==""){
            setError("Please input fullname");
            return;
        }
        if(email==""){
            setError("Please input email");
            return;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false){
            setError("Email is not valid");
            return
        }
        if(password==""){
            setError("Please input password");
            return;
        }
        if(password!=confirmPassword){
            setError("Password dont match");
            return;
        }
        if(role==""){
            setError("Please select role");
            return;
        }
        if(checked==""){
            setError("Please select agree Terms and Privacy");
            return;
        }
        setError("");
        const payload = {
            full_name : fullName,
            email : email,
            password : password,
            role : role
        }
        dispatch(registerAction(payload))
    }
    const changeBorder = (role_clicked) =>{
        if(role_clicked==role){
            return '#024547'
        }
        return 'rgba(209, 213, 219,1)'
    }
    return (
      <View style={tw`bg-white w-full p-8 flex h-full justify-center`}>
        <Text style={tw`text-2xl text-green-800 font-bold`}>
          Become a Member
        </Text>
        <Text style={tw`mb-4`}>Get instant Access to 4500 Courses</Text>
        <TextInput
          placeholder="Full name"
          style={tw`p-3 px-3 border border-gray-300 rounded-lg`}
          onChangeText={(text) => {
            setFullName(text);
          }}
        />
        <TextInput
          placeholder="Email Address"
          style={tw`p-3 px-3 border mt-4 border-gray-300 rounded-lg`}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          style={tw`p-3 px-3 border mt-4 border-gray-300 rounded-lg`}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Comfirm password"
          style={tw`p-3 px-3 border mt-4 border-gray-300 rounded-lg`}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
        />
        {/* <Text style={tw`my-4`}>Sign up as</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableHighlight
            style={{ flex: 1, borderRadius: 10, marginRight: 4 }}
            onPress={() => {
              setRole("user");
            }}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
          >
            <View
              style={{
                flex: 5,
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: changeBorder("user"),
                borderRadius: 10,
              }}
            >
              <FontAwesome size={30} color="black" name="graduation-cap" />
              <Text>A student,</Text>
              <Text>loking for a course</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ flex: 1, borderRadius: 10, marginLeft: 4 }}
            onPress={() => {
              setRole("lecture");
            }}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
          >
            <View
              style={{
                flex: 5,
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: changeBorder("lecture"),
                borderRadius: 10,
              }}
            >
              <FontAwesome5 size={30} color="black" name="chalkboard-teacher" />
              <Text>A lecture,</Text>
              <Text>posting my course</Text>
            </View>
          </TouchableHighlight>
        </View> */}
        <View
          style={[
            styles.checkboxContainer,
            { alignItems: "center", alignContent: "center" },
          ]}
        >
          <CheckBox
            label="Checkbox"
            selected={checked}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text>I agree with </Text>
          <TouchableOpacity>
            <Text style={styles.terms}>Terms </Text>
          </TouchableOpacity>
          <Text>and </Text>
          <TouchableOpacity>
            <Text style={styles.privacy}>Privacy</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "red", fontWeight: "bold" }} onPress={() => {}}>
          {`${error}` || `${error}`}
        </Text>
        <TouchableOpacity
          style={{
            height: 50,
            alignItems: "center",
            backgroundColor: "#07B464",
            justifyContent: "center",
            marginBottom: 8,
            borderRadius: 8,
          }}
          onPress={register}
        >
          <Text style={tw`text-white`}>Sign in</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.alreadyAccount}>Already have an account?</Text>
          <TouchableOpacity>
            <Text
              style={styles.signUp}
              onPress={() => navigation.navigate("Login")}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    signUp: {
        paddingLeft: 2,
        marginLeft: 2,
        color: 'green'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginTop: 16,
        alignItems: 'center'
    },
    privacy: {
        color: 'green'
    },
    terms: {
        color: 'green'
    },
})