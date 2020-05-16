import React, { useState, Component } from "react";
import {
    Alert,
    AsyncStorage,
    ActivityIndicator,
    Image,
    Modal,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
    //WebView,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Header
} from "react-native";
import {
    Avatar,
    Button,
    Card,
    Input,
    Icon,
    Text,
    Overlay,
} from "react-native-elements";
import { WebView } from 'react-native-webview';

import { place_order, get_product_detail, cancel_order } from "../services/Api";
import DatePicker from "react-native-datepicker";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';

export default class OrderScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false,
            order_quantity: 0,
            product_id: 0,
            selected_product: undefined,
            total_amount: 0,
            isModalVisible: false,
            approval_url: undefined,
            payment_token: undefined,
            deliver_date: "",
            deliver_time: "",
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 2,
        };
    }

    static navigationOptions = {
        title: "Order"
    };

    // // datepicker 
    // showDateTimePicker = () => {
    //     this.setState({ isDateTimePickerVisible: true });
    //   };

    //   hideDateTimePicker = () => {
    //     this.setState({ isDateTimePickerVisible: false });
    //   };

    //   handleDatePicked = date => {
    //     console.log("A date has been picked: ", date);
    //     this.hideDateTimePicker();
    //   };


    ////

    // used for first initialized OrderScreen
    componentDidMount() {
        // get selected product id from ProductsScreen
        // called from navigate('Order', {product_id: item_id}) in ProductsScreen
        const product_id = this.props.navigation.getParam("product_id");
        console.log("Entering OrderScreen");
        console.log(product_id);
        if (product_id != undefined) {
            // update the product_id variable in state
            this.setState({ product_id: product_id });
            // refresh product detail
            this.performRefresh(product_id);
        }
    }

    // used for everytime users select new product from ProductsScreen
    componentWillReceiveProps(new_props) {
        // get the new product_id from ProdcutsScreen
        // called from navigate('Order', {product_id: item_id}) in ProductsScreen
        console.log("New props");
        console.log(new_props);
        const product_id = new_props.navigation.getParam("product_id");
        console.log(product_id);
        console.log("....");
        if (product_id != undefined) {
            // update the product_id variable in state
            this.setState({ product_id: product_id });
            // refresh product detail
            this.performRefresh(product_id);
        }
    }


    // used to refesh product detail from server
    performRefresh = async (id) => {
        // get the id from passing arguments
        // if not found, get it from state.product_id
        if (id === undefined) {
            id = this.state.product_id
        }
        // set isLoading & refreshing to true for showing ActivityIndicator
        // known as loading circle
        this.setState({
            isLoading: true,
            refreshing: true
        });
        // get updated product detail from server by using get_product_detail()
        console.log("In Perform refresh");
        console.log("id" + id.toString());
        var product = await get_product_detail(id);
        console.log(product);
        // if product get successfully from server
        if (product.id !== undefined) {
            this.setState({
                isLoading: false,
                refreshing: false,
                selected_product: product
            });
        } else {
            // if product get failure from server
            this.setState({
                isLoading: false,
                refreshing: false,
            });
        }
    };

    // following function is used to when user input qty in textfield
    inputQty = number => {
        const product = this.state.selected_product;
        const old_total = this.state.total_amount;

        if (number > product.quantity) {
            number = product.quantity;
        }
        if (number != null) {
            total = number * product.price;
        }
        // after caculation, update the total amount and order quantity
        // to state for update UI components
        this.setState({
            order_quantity: number,
            total_amount: total
        });
    };

    onCloseOverlay = () => {
        this.setState({ isModalVisible: false })
        if (this.state.selected_product == undefined) {
            cancel_order(this.state.payment_token);
        }
    }

    // submit button action
    onPressSubmit = () => {
        // get all 3 variable from state
        // const { selected_product, order_quantity, total_amount, deliver_date } = this.state;
        const { selected_product, order_quantity, total_amount} = this.state;

        //console.debug("Submited orders:");
        // console.debug(
        //     selected_product.id + ":order=" + order_quantity + ":total_amount=" + total_amount
        // );
        // following checking prevent users no input or invalid input
        console.log("current State: ",this.state);
        if (total_amount == 0 || order_quantity == 0) {
            Alert.alert(
                'Warning',
                'Please input your quantity',
                [
                    { text: 'OK' },
                ], { cancelable: false },
            );
            // after return, function will terminated
            return
        }
        // place_order() is a function import from servers/api.js
        /*
        In api.js:
            place_order(order)
        In here:
            place_order({......})
        It means:
            here's {......} will become order in api.js
            order = {......}, so that we can access these 3 variable in order variable
            eg:
                order={
                    product_id: 1,
                    quantity: 10,
                    total_amount: 100
                }
        */
        place_order({
            product_id: selected_product.id,
            quantity: order_quantity,
            total_amount: total_amount,
            deliver_date: this.state.deliver_date,
            deliver_time: this.state.deliver_time,
            address: this.state.address
            // deliver_date: deliver_date
        }).then(response => {
            // using then to handle next operation after received response
            if (response.approval_url !== undefined) {
                this.setState({
                    selected_product: undefined,
                    order_quantity: 0,
                    total_amount: 0,
                    isModalVisible: true,
                    approval_url: response.approval_url,
                    payment_token: response.payment_token,
                });
                this.props.navigation.navigate("Products")
            }
        });


    };

    // this is the main function to display a page
    render() {
        const selected_product = this.state.selected_product;
        console.log(selected_product);
        // const DateTimePicker = require('@react-native-community/datetimepicker');
        const deliver_date = this.state.deliver_date;

        // const [date, setDate] = useState(new Date(1598051730000));
        // const [mode, setMode] = useState('date');
        // const [show, setShow] = useState(false);

        // following means that data is not ready
        // will display a ActivityIndicator (loading animation)
        let content_view;
        if (this.state.isLoading) {
            contentView = (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        // If not loading
        if (selected_product === undefined) {
            // If selected product is empty, show no product message
            contentView = (
                <View style={{ alignItems: "center", justifyContent: "center", marginTop: this.state.height }}>
                    <Text> No product selected! </Text>
                    <Text> Please select a product from list first! </Text>
                </View>
            );
        } else {

            // If selected product is not empty
            // display detail
            const url = selected_product.picture;
            contentView = (
                
                <View >
                    <View style={{ flexDirection: 'column' }}>
                        <View >
                            <Image
                                style={{ width: this.state.width, height: this.state.height }}
                                source={{ uri: selected_product.picture }}
                            />
                        </View>
                        <TouchableOpacity>
                                <Image Srouce={require("../assets/images/arrow-ios-back.png")} style={{width:50,height:50}}></Image>
                            </TouchableOpacity>
                        <View style={{ backgroundColor: "orange" }}>
                            <View style={style.textContainer01}>
                                <Text style={{ fontSize: 40, color: "white" }}> {selected_product.name} </Text>
                            </View>
                        </View>
                        <View style={style.textContainer}>
                            <Text style={style.text02}>{selected_product.description}</Text>
                            <Text style={style.text01}>{selected_product.quantity} Left in stock</Text>
                            <Text style={style.text01}>${selected_product.price}</Text>
                        </View>
                        <View style={style.textContainer}>
                            <Text style={style.text01}>Quantity</Text>
                            <Input

                                // containerStyle={{
                                //     borderWidth: 1, // size/width of the border
                                //     borderColor: "lightgrey", // color of the border
                                //     marginVertical: 5
                                // }}
                                keyboardType="numeric"
                                value={`${this.state.order_quantity}`}
                                onChangeText={this.inputQty}
                                clearTextOnFocus={true} //only work on IOS
                                style={{ paddingTop: 50 }}
                            />
                        </View>

                        <View style={style.textContainer}>

                            <Text style={style.text01}>Delivery Address</Text>

                            <Input
                                keyboardType="default"
                                //value={`${this.state.order_quantity}`}
                                onChangeText={(text)=>{this.setState({address:text})}}
                                clearTextOnFocus={true} //only work on IOS
                            
                            />
                        </View>
                        <View style={style.dateContainer}>
                            <DatePicker
                                style={{
                                    width: this.state.width,
                                    paddingRight: 20,

                                }}
                                date={this.state.deliver_date}
                                // date = '2016-05-15'
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate={new Date()}
                                maxDate="2022-12-31"
                                confirmDtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 3,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => {
                                    // console.log(date)
                                    this.setState({ deliver_date: date })
                                }}
                            />
                        </View>
                        <View style={style.dateContainer}>
                            <DatePicker
                                style={{
                                    paddingRight: 20,
                                    width: this.state.width,


                                }}
                                date={this.state.deliver_time}

                                mode="time"
                                placeholder="select time"
                                // format="HH:mm:ss.sss"
                                // minDate={this.state.deliver_date}
                                // maxDate="2022-01-02"
                                // minDate="00:00:00.000"
                                // maxDate="12:00:00.000"
                                confirmDtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(time) => {
                                    // console.log(date)
                                    console.log(time);
                                    this.setState({ deliver_time: time })
                                }}
                            />
                        </View>
                        <View style={style.textContainer}>
                            <Text style={style.text01}>Total Amount: ${this.state.total_amount}</Text>
                        </View>
                        <Button
                            title="ORDER"
                            icon={{ name: "payment", color: "white"}}
                            backgroundColor="#03A9F4"
                            buttonStyle={{ borderRadius: 0, marginTop: 100 , marginBottom: 60 }}
                            onPress={this.onPressSubmit}
                        />
                        
                    </View>

                </View >

            );
        }
        // render Order Screen
        return (
            
            <View>
                <View style={{paddingTop:10}}>
                <TouchableOpacity title="Press me" onPress={() => this.props.navigation.navigate('Products')} >
                    <Image style={{ height:40, width: 40 }} source={require("../assets/images/arrow-ios-back.png")} />
                    </TouchableOpacity>
                </View>
                 <ScrollView>

                <Overlay
                    isVisible={this.state.isModalVisible}
                    onRequestClose={this.onCloseOverlay}
                    onBackdropPress={this.onCloseOverlay}
                >
                    <WebView source={{ uri: this.state.approval_url }} />
                </Overlay>
                    {contentView}
                    

                </ScrollView>
                
            </View>
        );
    }

};
const style = StyleSheet.create({
    textContainer: {
        paddingTop: 10,
        paddingLeft: 10
    },
    textContainer01: {
    },
    text01: {
        fontSize: 20
    },
    text02: {
        fontSize: 20,
        color: "grey"
    
    },
    dateContainer: {
        paddingRight: 20,
        paddingTop: 30,
        
        paddingLeft: 10
    }


}) 
