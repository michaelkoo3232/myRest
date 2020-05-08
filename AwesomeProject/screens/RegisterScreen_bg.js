import React, { Component } from "react";
import {
  AsyncStorage,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import {
  Button,
  Input,
} from "react-native-elements";

export default class RegisterScreen extends Component {

  static navigationOptions = {
    title: "Sign Up",
  };
  render() {
    return (

    <ImageBackground
      source={require("../assets/images/background_2633962_960_720_by_b0mbsh8llresources_dc4yaor-fullview.jpg")}
      style={styles.imageBG}
    >
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={{
          resizeMode:"contain",
          width:"50%",
          height:"50%",
          marginBottom:10
        }}
      />
    <Input
      placeholder="Your USERNAME"
      returnKeyType="go"
      textContentType="username"
      containerStyle={styles.inputContainer}
      inputContainerStyle={styles.inputField}
      underlineColorAndroid="white"
    />









    </ScrollView>
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  // background image style
  imageBG: {
    width: "100%",
    height: "100%"
  },
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:20
  },
  inputContainer:{
    marginVertical:5
  },
  inputField:{
    backgroundColor: "white",
    opacity: 0.7,
    borderRadius:15
  },
});










