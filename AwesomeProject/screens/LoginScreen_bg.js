import React, { Component } from "react";
import {
  AsyncStorage,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import {
  Button,
  Icon,
  Input,
} from "react-native-elements";

export default class HomeScreen extends Component {

  static navigationOptions = {
    title: "Sign In"
  };

  // main function to render the UI components
  render() {
 
    // return the UI components
    return (
      <View>
      <ImageBackground
        source={require("../assets/images/login_bg.jpeg")}
        style={styles.imageBackground}
      >

        </ImageBackground>
      
      </View>
    );
  }
}
// defined all UI component style by using StyleSheet in React Native
// A StyleSheet is an abstraction similar to CSS StyleSheets
// https://facebook.github.io/react-native/docs/stylesheet
// Flexbox : https://facebook.github.io/react-native/docs/flexbox
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
    imageBackground:{
      width:"100%",
      height:"100%"
    },
});








