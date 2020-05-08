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
} from 'react-native';
import {
  Divider,
  Header,
  ListItem,
} from 'react-native-elements';
 
 
// import { get_products_list, get_user_info } from '../services/Api';
 
 
 
export default class ProductsScreen extends Component {

 
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      dataSource:
        [
            {
                "id": 2,
                "name": "Pearl",
                "price": "999.90",
                "discount": 1,
                "quantity": 4,
                "description": "New Pearl 2018",
                "picture": "",
                "created": "2018-12-22",
                "updated": "2019-02-16"
            },
            {
                "id": 1,
                "name": "Apple",
                "price": "9.99",
                "discount": 1,
                "quantity": 99,
                "description": "Fuji Apple",
                "picture": "",
                "created": "2018-12-22",
                "updated": "2019-02-16"
            }
        ]
        }
     this.pressedAdd = this.pressedAdd.bind(this)
  }
 

  pressedAdd = (item_id) => {
    // console.log("Pressed Add", item)
    this.props.navigation.navigate('Order', {
      product_id: item_id
    });
  }
 


  // this is the main function to display a page
    render() {

        return (
        // following means that data is not ready
    // will display a ActivityIndicator (loading animation)
            <ScrollView>
         <FlatList
            data={this.state.dataSource}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <ListItem
                title={item.name}
                subtitle={
                  <View>
                    <Text>{item.description}</Text>
                    <Text>Qty: {item.quantity}</Text>
                    <Text>Price: ${item.price}</Text>
                    <Text>Last Update: {item.updated}</Text>
                  </View>
                }
                leftAvatar={{ source : {uri:item.picture} }}
                rightIcon={{ name:"add" }}
                onPress={() => this.pressedAdd(item.id)}
              />
            )}
          />
            </ScrollView>
    )
      }
}
