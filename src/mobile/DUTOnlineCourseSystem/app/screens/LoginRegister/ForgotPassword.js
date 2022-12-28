import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import COLOR from "../../const/color";
import tw from "tailwind-react-native-classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../actions/userAction";

const ForgotPassword = ({ navigation }) => {
    const [email,setEmail] = useState('');
    const dispatch = useDispatch();
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
      }}
    >
      <View style={{ padding: 30, marginTop:100 }}>
        <View>
          <Text style={[tw`text-2xl text-green-800 font-bold`]}>
            Forgot Your Password
          </Text>
          <Text style={{ marginVertical: 30, fontWeight: "500", textAlign:'justify' }}>
            Please enter the email address you 'll be sent a link to your mail
            to reset password
          </Text>
          <TextInput
            placeholder="Email"
            style={tw`p-3 px-3 border border-gray-300 rounded-lg`}
            onChangeText={(email) => {
                setEmail(email)
            }}
          />
          <TouchableOpacity
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 24,
              borderRadius: 8,
              backgroundColor:'#024547'
            }}
            onPress={()=>{
                if(email==""){
                    Alert.alert("Error","Please input email")
                }
                else{
                    dispatch(forgotPassword({email:email}))
                }
            }}
          >
            <Text style={{ color: "white", fontWeight: "800" }}>
              Request reset link
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 60,
              alignItems: "center",
              marginBottom: 20,
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={[{ color: "#024547", fontWeight: "800" }]}>
              Back To Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  signUp: {
    paddingLeft: 2,
    marginLeft: 2,
    color: "green",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
});
