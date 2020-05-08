import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

render() {
    return (
      <View style={styles.container}>
        <Text>ReactNative Tutorial</Text>
 </View>
 );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});