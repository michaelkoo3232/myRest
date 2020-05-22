import React, { Component } from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  List,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import {
  Divider,
  Header,
  ListItem,
  Icon,
  SearchBar,
} from 'react-native-elements';
import { Card } from 'react-native-shadow-cards';
import { Ionicons } from '@expo/vector-icons';



import { get_products_list } from '../services/Api';



export default class ProductsScreen extends Component {
  componentsMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      search: null,
      width: Dimensions.get('window').width / 2 - 20,
    }
    this.pressedAdd = this.pressedAdd.bind(this)
  }

  static navigationOptions = {
    title: 'Product',
  };

  // componentDidMount means preparation before display the page
  // in following, it does getting data from server
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

    return get_products_list().then(response => {
      if (response.detail == "Invalid token.") {
        this.props.navigation.navigate('Login');
      }
      if (this.componentsMounted) {
        this.setState({
          isLoading: false,
          dataSource: response.results,
          refreshing: false,
        });
      }
    });


  }

  componentWillUnmount() {
    this.componentsMounted = false;
  }

  // following function is for drag the page down for refresh data
  pressRefresh = () => {
    this.setState({ refreshing: true });
    get_products_list().then(response => {
      this.setState({
        isLoading: false,
        dataSource: response.results,
        refreshing: false,
      });
    });
  }

  pressedAdd = (item_id) => {
    // console.log("Pressed Add", item)
    this.props.navigation.navigate('Order', {
      product_id: item_id
    });
  }
  


  // this is the main function to display a page
  render() {
    // following means that data is not ready
    // will display a ActivityIndicator (loading animation)
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    const { username } = this.state
    // If data is reading
    // render the product list
    const cols = 2;
    return (
      <SafeAreaView style={{ flexDirection: 'column', backgroundColor: 'orange' }}>
        {/* hiding status bar  */}
        <StatusBar
          backgroundColor="#b3e6ff"
          barStyle="dark-content"
          hidden={true}
          translucent={true}
        />
        {/* header bar  */}
        <View style={{ height: 50, backgroundColor: 'orange' , justifyContent: 'space-between',flexDirection:"row"}}>
          <Text style={{fontWeight:'bold',fontSize:20}}>Hi,{username}</Text>
          <TouchableOpacity title="Press me" onPress={() => this.logout() } >
                <Text style={{fontWeight:'bold',fontSize:20}}>Logout </Text>
            </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 0 ,backgroundColor: 'white'}}>

          <FlatList
            data={this.state.dataSource}
            keyExtractor={item => item.name}
            horizontal={false}
            numColumns={cols}

            renderItem={({ item }) => (
              <View >
                <Card style={{ padding: 10, margin: 10, width: this.state.width }}>
                  {/* making whole product card can be touchable with TouchableOpacity instead of using button */}
                  <TouchableOpacity title="Press me" onPress={() => this.pressedAdd(item.id)} >
                    <Image style={{ height: this.state.width - 20, width: this.state.width - 20 }} source={{
                      uri: item.picture,
                    }} />
                    <View style={{ height: 35 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 28 }}>{item.name}</Text>

                    </View>

                    <Text style={{ fontSize: 20 }}>${item.price}</Text>


                  </TouchableOpacity>
                </Card>
              </View>
            )}
          />

      </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({

})
