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
    <Input
      placeholder="Your PASSWORD"
      returnKeyType="next"
      textContentType="password"
      containerStyle={styles.inputContainer}
      inputContainerStyle={styles.inputField}
      underlineColorAndroid="white"
    />
    <Input
      placeholder="Confirm PASSWORD"
      returnKeyType="go"
      textContentType="password"
      containerStyle={styles.inputContainer}
      inputContainerStyle={styles.inputField}
      underlineColorAndroid="white"
    />

    <Button
      title="Register"
      containerStyle={styles.registerButton}
      textStyle={styles.buttonText}
    />

    <Button
      title="Back to Login"
      type="clear"
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
  registerButton:{
    backgroundColor: "blue",
    borderRadius:15,
    marginTop:20
  },
  buttonText:{
    fontSize:20,
    fontWeight: "bold"
  },
});










