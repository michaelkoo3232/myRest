import React, {Component} from 'react';

import {
  AsyncStorage,
  View,
  Text, 
  SafeAreaView
} from 'react-native';
import {
  Button
} from 'react-native-elements';


//import { register } from '../services/Api';


export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentWillMount() {
    AsyncStorage.getItem("username").then(username => {
      this.setState={
        username: username,
        isLoading: false
      }
    })
    console.log("name =  " + this.state.username +"...");
    
  }

    // this.setState(
    //     {
    //         username:name,
    //         id:userid
    //     }
    //   }

  render() {
    if(this.state.isLoading){
      return (
        <View>
          <Text>
            waiting
          </Text>
        </View>
      )
    }
    if(!this.state.isLoading){
      // const { username } = this.state;
      // console.log(username);
      return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: 'white' }}>
           <View style={{marginHorizontal: 15, marginVertical: 5}}>
            <Text style = {{ fontSize: 30, fontWeight:"bold"}}>
              Hello! {this.state.username}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: "column", justifyContent:'center', alignItems: 'center' }}>
  
            <Button
              // submit button
              title='Logout'
              onPress={ () => this.logout() }
            />
          </View>
        </SafeAreaView>
  
       
      );
      
    }
  
  }

  logout = async () => {
    // Authentication Part
    let keys = ['user_id', 'user_email', 'user_token'];
    await AsyncStorage.clear();
    this.props.navigation.navigate("AuthLoading");
  }

}

