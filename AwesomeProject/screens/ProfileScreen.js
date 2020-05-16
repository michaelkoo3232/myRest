import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
  Text
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



  render() {
    return (
      <View style={{ flex: 1, justifyContent:'center', alignItems: 'center' }}>
        <Text style={{fontWeight:'bold',fontSize:20}}>Hi,{this.state.username}</Text>
        <Button
          // submit button
          title='Logout'
          onPress={ () => this.logout() }
        />  
      </View>
    )
  }

  logout = async () => {
    // Authentication Part
    let keys = ['user_id', 'user_email', 'user_token'];
    await AsyncStorage.clear();
    this.props.navigation.navigate("AuthLoading");
  }

}

