import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import {connect, useDispatch} from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux'
// import useState from React
const initState = {
  username: "",
  password:"",
  error:"",
  details : ""
}

const LoginScreen = ({ navigation}) => {
  const dispatch = useDispatch();
  let [state,setStateLogin] = useState(JSON.parse(JSON.stringify(initState)))
  const details = useSelector((state)=>state.auth.error)
  const handleUsername = (text, e) => {
    console.log(`text: ${text}`);
    this.setState({
      username: text,
    });
    console.log(`text: ${this.username}`);
  }
  const handleLogin =() =>{
    if ( state.username == "" || state.password == ""){
      setStateLogin({
        ...state,
        error : "Please input your email or password"
      })
    }
    else{
      setStateLogin({
        ...state,
        error : ""
      })
      dispatch(loginAction(state))
    }
    console.log(state)
  }

  return (
    <View style={tw`bg-white w-full p-8 flex h-full justify-center`}>
      <Text style={tw`text-2xl text-green-800 font-bold`}>Welcome to E-Learning</Text>
      <Text style={tw`mb-8`}>Get instant Access to 4500 Courses</Text>
      <TextInput
        placeholder="Email Address"
        style={tw`p-3 px-3 border border-gray-300 rounded-lg`} 
        onChangeText = {newText => state.username = newText}
        // value={this.state.username}
        />
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        style={tw`p-3 px-3 border mt-4 border-gray-300 mb-3 rounded-lg`} 
          onChangeText = {newText => state.password = newText}
        />
      <Text style={tw`mb-3 text-red-600 font-medium`}>{`${state.error}` || details}</Text>
      <Text style={tw`mb-3`}>Forgot password?</Text>
      <TouchableOpacity style={{
        height: 50,
        alignItems: 'center',
        backgroundColor: '#07B464',
        justifyContent: 'center',
        marginBottom: 4,
        borderRadius: 8,
      }}
        onPress = {handleLogin}>
        <Text style={tw`text-white`}>
          Sign in
        </Text>
      </TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={styles.newToELearning}>New to E-Learning?</Text>
        <Text
          style={styles.signUp}
          onPress={() => navigation.navigate('Register')}
        >Sign up</Text>
      </View>
    </View>
  );
}

const loginAction = (state)=>{
  return {
    type : "USER_LOGIN_REQUEST",
    payload: state
  }
}
function mapStateToProps(state){
  return {
    isLogin : state.auth
  }
}
export default connect(
  mapStateToProps,
  dispatch =>{

  }
)(LoginScreen);

const styles = StyleSheet.create({
  title: {
    color: "#f00"
  },
  signUp: {
    paddingLeft: 2,
    marginLeft: 2,
    color: 'green'
  },
  signUpButton: {
    padding: 50
  }
})