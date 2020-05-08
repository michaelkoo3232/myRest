import React, {Component} from 'react';
import {
  AsyncStorage,
  View
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

  render() {
    return (
      <View style={{ flex: 1, justifyContent:'center', alignItems: 'center' }}>
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