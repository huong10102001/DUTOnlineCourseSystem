import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import React, { useState } from "react";
import CheckBox from "../../components/Checkbox";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { registerAction } from "../../actions/registerAction";
import { connect, useDispatch, useSelector } from "react-redux";
import COLOR from "../../const/color";
const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const error_api = useSelector((state) => state.regis.error);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [checked, setChecked] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const register = () => {
    if (fullName == "") {
      setError("Please input fullname");
      return;
    }
    if (email == "") {
      setError("Please input email");
      return;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setError("Email is not valid");
      return;
    }
    if (password == "") {
      setError("Please input password");
      return;
    }
    if (password != confirmPassword) {
      setError("Password dont match");
      return;
    }
    if (role == "") {
      setError("Please select role");
      return;
    }
    if (checked == "") {
      setError("Please select agree Terms and Privacy");
      return;
    }
    setError("");
    const payload = {
      full_name: fullName,
      email: email,
      password: password,
      role: role,
    };
    dispatch(registerAction(payload));
  };
  const changeBorder = (role_clicked) => {
    if (role_clicked == role) {
      return "#024547";
    }
    return "rgba(209, 213, 219,1)";
  };
  return (
    <View style={tw`bg-white w-full p-8 flex h-full justify-center`}>
      <Text style={tw`text-2xl text-green-800 font-bold`}>Become a Member</Text>
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
          backgroundColor: "#024547",
          justifyContent: "center",
          marginBottom: 8,
          borderRadius: 8,
        }}
        onPress={register}
      >
        <Text style={[tw`text-white`, {fontWeight:'800'}]}>Sign up</Text>
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
};

export default RegisterScreen;

const styles = StyleSheet.create({
  signUp: {
    paddingLeft: 2,
    marginLeft: 2,
    color: "#024547",
    fontWeight:'800'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  privacy: {
    color: "#024547",
    fontWeight:'800'
  },
  terms: {
    color: "#024547",
    fontWeight:'800'
  },
});
