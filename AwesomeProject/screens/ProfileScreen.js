import React, { Component } from 'react';
import { Card } from 'react-native-shadow-cards';
import {
  Image,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  Button
} from 'react-native-elements';


//import { register } from '../services/Api';


export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  componentDidMount() {
    this.componentsMounted = true;
    if (this.componentsMounted) {
      AsyncStorage.getItem("username").then((username) => {
        console.log(username);
        this.setState({
          username: username,
        });
      });
    }
  };

  logout = async () => {
    // Authentication Part
    let keys = ['user_id', 'user_email', 'user_token'];
    await AsyncStorage.clear();
    this.props.navigation.navigate("AuthLoading");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer01}>
          <Text style={{ fontWeight: 'bold', fontSize: 28, alignSelf: 'flex-start', color: "yellowgreen" }}>Welcome, {this.state.username}!</Text>

        </View>
        <View style={styles.card}>
          <Card >
            <View style={styles.cardContainer}>
              <View style={styles.header}>
                <Image style={styles.logo} source={require("../assets/images/icon.png")} /> 
              </View>

              <View style={styles.Description}>
              <View style={styles.textBox01}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Message from Fruit Planet</Text>
                </View>
              </View>

              <View style={styles.Description}>
              <View style={styles.textBox00}>
                <Text>Hi {this.state.username},</Text>
              </View>
              <View style={styles.textBox00}>
                  <Text>
                    Thanks for supporting us! Our goal is to deliver the fresh fruit from all over the world to your doorstep.
                 </Text>

                </View>
                <View style={styles.textBox00}>
                  <Text>
                    We would like to provide more affordable tasty seasonal fruits to all the fruit lovers in Hong Kong.
                  </Text>
                </View>
                <View style={styles.textBox00}>
                  <Text>
                    We also support sustainable agriculture and packaging to help build a better world!
                  </Text>
                </View>
              </View>

            </View>
          </Card>
        </View>
        <View style={{ paddingTop: 50 }}>
          <Button
            // submit button

            title='Logout'
            onPress={() => this.logout()}
          />
        </View>
      </View>
    )
  }




}
var margin = Dimensions.get('screen').height * 0.1;
const styles = StyleSheet.create({
  container: {
    paddingTop: margin,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },

  textContainer01: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  card: {
    paddingTop: 50
  },
  logo: {
    height: 100,
    width: 100
  },
  cardContainer: {
    paddingTop:10,
    paddingBottom:10,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textBox00: {
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10
  },
  textBox01: {
    paddingTop:10,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10
  }

})
