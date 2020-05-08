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
 
      const {navigate}=this.props.navigation;
    // return the UI components
    return (
      <View>
      <ImageBackground
        source={require("../assets/images/login_bg.jpeg")}
        style={styles.imageBackground}
      >

      <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.loginLogo}
      />

      <Input
        textContentType="username"
        placeholder="USERNAME"
        returnKeyType="next"
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        underlineColorAndroid="white"
        leftIcon={
          <Icon
            name='person'
            size={24}
            color='black'
          />
                  }
        />

        <Input
          textContentType="password"
          secureTextEntry
          placeholder="PASSWORD"
          returnKeyType="go"
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.input}
          underlineColorAndroid="white"
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
              />
                    }
          />

          <Button
            title="Login"
            containerStyle={styles.loginButton}
            titlestyle={styles.loginText}
          />
          <Button
            title="Register"
            type="clear"
            containerStyle={styles.loginButton}
            titlestyle={styles.registerText}
            onPress={()=>navigate("Register")}
          />


      </ScrollView>



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
    loginLogo:{
      resizeMode:"contain",
      width:"50%",
      height:"50%",
      marginBottom:10
    },
    inputContainer:{
      marginVertical:5,
      backgroundColor:"red",
    },
    input:{
      backgroundColor:"white",
      opacity:0.8,
      borderRadius:15,
    },
});








