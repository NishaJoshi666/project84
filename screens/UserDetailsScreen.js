import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Header,Card} from 'react-native-elements'; 
import db from '../config';
import firebase from 'firebase';

export default class UserDetailsScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            userId:firebase.auth().currentUser.email,
            exchangerId:this.props.navigation.getParam('details')["user_name"],
            exchangeId:this.props.navigation.getParam('details')["exchange_id"],
            itemName:this.props.navigation.getParam('details')["item_name"],
            description:this.props.navigation.getParam('details')["description"],
            exchangerName:'',
            exchangerContact:'',
            exchangerAddress:'',
            exchangerRequestDocId:''
        }
    }

    getUserDetails(){
        db.collection('users').where('email_address','==',this.state.exchangerId).get()
        .then(snapShot=>{
            snapShot.forEach(doc=>{
                this.setState({
                    exchangerName:doc.data().first_name,
                    exchangerContact:doc.data().mobile_number,
                    exchangerAddress:doc.data().address
                })
            })
        })
        db.collection('exchange_requests').where('exchange_id','==',this.state.exchangeId).get()
        .then(snapShot=>{
            snapShot.forEach(doc=>{
                this.setState({
                    exchangerRequestDocId:doc.id
                })
            })
        })
    }

    addBarters=()=>{
        db.collection('MyBarters').add({
            item_name:this.state.itemName,
            exchanger_name:this.state.exchangerName,
            exchanger_contact:this.state.exchangerContact,
            exchanger_address:this.state.exchangerAddress,
            exchanger_id:this.state.exchangerId,
            exchange_status:"exchanger Interested"
        })
    }

    addNotification=()=>{
        var message = this.state.userName + " has Shown interest in exchanging the item"
        db.collection("all_notifications").add({
            "targeted_user_id" : this.state.exchangerId,
            "exchanger_id" : this.state.userId,
            "exchangeid" : this.state.exchangeId,
            "item_name" : this.state.itemName,
            "date" : firebase.firestore.FieldValue.serverTimestamp(),
            "notification_status" : "unread",
            "message" : message
        })
    }

    componentDidMount(){
        this.getUserDetails()
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex:0.1}}>
                    <Header leftComponent = {<Icon name = 'arrow-left' type = 'feather' color='orange' onPress={()=>{
                        this.props.navigation.goBack()
                    }}/>}
                    centerComponent = {{text:'Donate items',style:{fontSize:20,fontWeight:'bold',color:'orange'}}}
                    backgroundColor = 'lightblue'/>
                </View>
                <View style = {{flex:0.3}}>
                    <Card title = {'Item Information'} titleStyle = {{fontSize:20}}>
                        <Card><Text style = {{fontWeight:'bold'}}>Name: {this.state.itemName}</Text></Card>
                        <Card><Text style = {{fontWeight:'bold'}}>Reason: {this.state.description}</Text></Card>
                    </Card>
                </View>
                <View style = {{flex:0.3}}>
                <Card title = {'Exchanger Information'} titleStyle = {{fontSize:20}}>
                        <Card><Text style = {{fontWeight:'bold'}}>Name: {this.state.exchangerName}</Text></Card>
                        <Card><Text style = {{fontWeight:'bold'}}>Contact: {this.state.exchangerContact}</Text></Card>
                        <Card><Text style = {{fontWeight:'bold'}}>Address: {this.state.exchangerAddress}</Text></Card>
                    </Card>
                </View>
                <View style = {styles.buttonContainer}>
                    {this.state.exchangerId !==this.state.userId?
                    (<TouchableOpacity style = {styles.button}
                    onPress={()=>{
                        this.addBarters()
                        this.addNotification()
                        this.props.navigation.navigate('MyBarters')
                    }}>
                        <Text>I Want to Exchange</Text>
                        </TouchableOpacity>):null}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:200,
      height:50,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 10,
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    }
  })