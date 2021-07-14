import React ,{Component} from 'react';
import {Text,View,TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../component/MyHeader';

export default class MyDonationsScreen extends Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allBarters:[],

        }
        this.requestRef = null
    }
    getAllBarters=()=>{
        this.requestRef = db.collection('MyBarters').where('exchanger_id','==',this.state.userId).onSnapshot((snapShot)=>{
            var allBarters= snapShot.docs.map(document=>document.data())
            this.setState({
                allBarters:allBarters
            })
        })
    }
    keyExtractor = (item,index)=>index.toString()
    renderItem = ({item,i})=>{
        <ListItem
        key = {i}
        title = {item.item_name}
        subtitle = {'requested by:'+item.exchanger_id+'\nStatus: '+item.exchange_status}
        leftElement = {<Icon name = 'item' type = 'font-awesome' color = 'orange'/>}
        titleStyle = {{color:'black',fontWeight:'bold'}}
        rightElement = {<TouchableOpacity style = {styles.button}
        onPress = {()=>{
            this.sendItem(item)
        }}>
            <Text style = {{color:'black'}}>send item</Text>
        </TouchableOpacity>}
        bottomDivider/>
    }
    sendNotification = (itemDetails,requestStatus) =>{
        var exchangeId = itemDetails.exchange_id
        var exchangerId = itemDetails.exchanger_id
        db.collection('all_notifications').where('exchange_id','==',exchangeId).where('exchanger_id','==',exchangerId).get()
        .then(snapShot=>{
            snapShot.forEach(doc=>{
                var message = ""
                if(requestStatus==='Item Sent'){
                    message = this.state.userName+" sent you item"
                }
                else{
                    message = this.state.userName+" Has Shown interest in exchanging the item"
                }
                db.collection('all_notifications').doc(doc.id).update({
                    message:message,
                    notification_status:"unread",
                    date:firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    } 
    sendItem=(itemDetails)=>{
        if(itemDetails.request_status==='Book Sent'){
            var requestStatus = 'exchanger Interested'
            db.collection('all_donations').doc(itemDetails.doc_id).update({
                request_status:"exchanger Interested"
            })
            this.sendNotification(itemDetails,requestStatus)
        }
        else{
            var requestStatus = 'item Sent'
            db.collection('all_donations').doc(itemDetails.doc_id).update({
                request_status:"item Sent"
            })
            this.sendNotification(itemDetails,requestStatus)
        }
    }
    componentDidMount(){
        this.getAllBarters()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader navigation = {this.props.navigation} title = 'My Barters'/>
                <View style = {{flex:1}}>
                    {this.state.allBarters.length===0?
                    (<View style = {styles.subTitle}>
                        <Text style = {{fontSize:20}}>List of all Barters</Text></View>):
                        (<FlatList keyExtractor = {this.keyExtractor}
                        data = {this.state.allBarters}
                        renderItem = {this.renderItem}/>)}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subTitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })