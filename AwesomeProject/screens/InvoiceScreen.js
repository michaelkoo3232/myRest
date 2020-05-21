import { get_orders_list } from '../services/Api';
import { StyleSheet, ScrollView, AsyncStorage,View ,Text, SafeAreaView} from 'react-native';
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
               var row = this.state.recordList[i];
               var customer = row.customer;
               var product = row.product;
               var invoice_no = row.invoice_no;
               var address = row.address;
               var totalPrice = row.total_amount;
               var deliverDate = row.deliver_date;
               var deliverTime = row.deliver_time;
                if (this.state.id == customer.id) {
                
                    recordInfo.push(
                        (    
                            <Card key={i.toString()}>

                                <View style={styles.row}>
                                    <View style={styles.title}>
                                        <Text style={styles.titleText}>
                                            Invoice No.: 
                                        </Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text>
                                            {invoice_no}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.title}>
                                        <Text style={styles.titleText}>
                                            Product: 
                                        </Text>

                                    </View>
                                    <View style={styles.content}>
                                        <Text>
                                            {product.name}
                                        </Text>

                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.title}>
                                        <Text style={styles.titleText}>
                                            Total: 
                                        </Text>

                                    </View>
                                    <View style={styles.content}>
                                        <Text>
                                            ${totalPrice}
                                        </Text>

                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.title}>
                                        <Text style={styles.titleText}>
                                            Address: 
                                        </Text>

                                    </View>
                                    <View style={styles.content}>
                                        <Text>
                                            {address==""?"No Address": address}
                                        </Text>
                                    </View>
                                </View>
                                
                                <View style={styles.row}>
                                    <View style={styles.title}>
                                        <Text style={styles.titleText}>
                                            Delivery Date: 
                                        </Text>

                                    </View>
                                    <View style={styles.content}>
                                        <Text>
                                            {deliverDate}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.title}>
                                        <Text style={styles.titleText}>
                                            Delivery Time: 
                                        </Text>

                                    </View>
                                    <View style={styles.content}>
                                        <Text>
                                            {deliverTime}
                                        </Text>
                                    </View>
                                </View>

                            

                            
                        </Card>)

                    );

                }

            }
        }
        return recordInfo;
    }
        return (
            <SafeAreaView style={{ flexDirection: 'column', backgroundColor: 'white' }}>
                <View>
                    <Text style={styles.headingText}>
                        Order Record: 
                    </Text>
                </View>
                 <ScrollView>
                    {generaterecord()}
                 </ScrollView>

            </SafeAreaView>
           
        )    
    }
}
    
const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    },

    title: {
        textDecorationStyle: "solid",
        flex: 1
    },

    content: {
        flex: 2
    },

    titleText: {
        fontWeight: "bold"
    },
    headingText: {
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 5,
        marginHorizontal: 15

    }






})