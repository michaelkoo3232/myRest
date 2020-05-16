import { get_orders_list } from '../services/Api';
import { StyleSheet, ScrollView, AsyncStorage,View ,Text} from 'react-native';
import React, {useState, Component } from "react";
import {Card,CardTitle,CardContent} from 'react-native-elements';
export default class RecordScreen extends Component {
    componentsMounted = false;


    constructor(props) {
        super(props);
        this.state = {
        
            
        }


    }

    static navigationOptions = {
        title: 'Invoice',
    };

    componentWillUnmount() {
        console.log("Entering Record Page");
        this.componentsMounted = false;
      }

    async componentDidMount() {
        var name =  await AsyncStorage.getItem("username")
        console.log("name =  " + name +"...");
        var userid =  await AsyncStorage.getItem('user_id')
        console.log("id =  " + userid +"...");

        this.setState(
            {
                username:name,
                id:userid
            }

        )

        return get_orders_list().then(response => {
            console.log(response);
            response.json().then(
                jsonText=>{
                  console.log("Fetch result");
                  console.log(jsonText.results[0].customer.username);
                //   console.log(typeof jsonText);
                  this.setState({recordList:jsonText.results,
                    isLoadedDoctor:true});
                }
                );
        });
        
            

    }



    render() {
        var generaterecord = ()=>{
            
            console.log("name: "+ this.state.username)
            console.log("id"+this.state.id)
            var recordInfo = [];
            

            if(this.state.recordList){
                
            for (i = 0; i < this.state.recordList.length; i++) {
               console.log(this.state.recordList[i]);
               var customer = this.state.recordList[i].customer;
               var product = this.state.recordList[i].product;
                if (this.state.id == customer.id) {
                
                    recordInfo.push(
                        (
                            
                            
                            <Card key={i.toString()}>
                            <Text>
                                {this.state.recordList[i].invoice_no}
                            </Text>
                            <Text>
                            {product.name}
                            </Text>
                            

                            
                        </Card>)

                    );

                }

            }
        }
        return recordInfo;
    }
    
        
    
        return (
            <ScrollView>
              {generaterecord()}
            </ScrollView>
        )    
    }
}
    


    



const styles = StyleSheet.create({





})