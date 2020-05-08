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

import { register } from "../services/Api";

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      isError: false,
      notMatch: false
    };
  }

  static navigationOptions = {
    title: "Sign Up",
  };

  // onPressRegister function handle Register button pressed
  onPressRegister = async () => {
    // get the 3 variables from state
    const { username, password, password2 } = this.state;
    // check 3 necessary variable cannot be empty string
    if (username == "" || password == "" || password2 == "") {
      this.setState({ isError: true, notMatch: false });
      return; // if one of them is empty, just return , stop execute the other code
    }
    // check 2 passwords input are the same
    if (password != password2) {
      this.setState({ isError: false, notMatch: true });
      return; // if not match just return , stop execute the other code
    }
    // call register function from servics/api.js
    // pass the username and password to handle the register process
    await register(username, password).then(response => {
      if (response.token != undefined) {
        AsyncStorage.setItem("user_token", response.token);
        AsyncStorage.setItem("user_id", response.user_id.toString());
        AsyncStorage.setItem("username", response.username);
        this.props.navigation.navigate("App");
      } else {
        this.setState({ isError: true, notMatch: false });
      }
    });
  };

  // username text input handler function
  inputUsername = value => {
    this.setState({ username: value });
  };
  // password1 text input handler function
  inputPassword = value => {
    this.setState({ password: value });
  };
  // password2 text input handler function
  inputPassword2 = value => {
    this.setState({ password2: value });
  };

  // main render function to render UI components
  render() {
    const { navigate } = this.props.navigation;
    // get any error, set different error message
    let errorMessage = null;
    if (this.state.isError) {
      errorMessage = "All fields cannot be blank!";
    } else if (this.state.notMatch) {
      errorMessage = "2 passwords must be same! Please verify again!";
    }

    return (
      <ImageBackground
        // using a ImageBackground to render a image in assets folder
        source={require("../assets/images/login_bg.jpeg")}
        style={styles.imageBG}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            // using an <Imgae> to add a login image
            source={require("../assets/images/logo.png")}
            // using direct style assign width: "50%", height: "50%",
            style={{
              resizeMode: "contain",
              width: "50%",
              height: "50%",
              marginBottom: 10
            }}
          />
          <Input
            placeholder="Your USERNAME"
            returnKeyType="next"
            textContentType="username"
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputField}
            underlineColorAndroid="white"
            onChangeText={value => this.inputUsername(value)}
          />
          <Input
            placeholder="Your PASSWORD"
            secureTextEntry
            returnKeyType="go"
            textContentType="password"
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputField}
            underlineColorAndroid="white"
            onChangeText={value => this.inputPassword(value)}
          />
          <Input
            placeholder="Confirm PASSWORD"
            secureTextEntry
            returnKeyType="go"
            textContentType="password"
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputField}
            underlineColorAndroid="white"
            onChangeText={value => this.inputPassword2(value)}
            errorStyle={{ color: 'red' }}
            errorMessage={errorMessage}
          />
          
          <Button
            // Register button
            title="Register"
            containerStyle={styles.registerButton}
            textStyle={styles.buttonText}
            onPress={this.onPressRegister}
          />
          <Button
            // back to LoginScreen button
            title="Back to Login"
            type="clear"
            onPress={() => navigate("Login")}
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
  // container style
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  // Following are input fields styles
  inputContainer: {
    marginVertical: 5
  },
  inputField: {
    backgroundColor: "white",
    opacity: 0.7,
    borderRadius: 15
  },
  // following are register button styles
  registerButton: {
    backgroundColor: "#00acc1",
    borderRadius: 15,
    marginTop: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold"
  },
});
