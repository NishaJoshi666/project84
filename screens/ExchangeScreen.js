import React ,{Component} from 'react';
import {Alert, KeyboardAvoidingView, Text,TextInput,TouchableOpacity,View,StyleSheet} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../component/MyHeader'

export default class ExchangeScreen extends Component{
    constructor(){
        super()
        this.state={
            itemName:'',
            description:'',
            userName:firebase.auth().currentUser.email
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }

    addItem=(itemName, description)=>{
        var userName = this.state.userName
        var randomExchange = this.createUniqueId()
        db.collection("exchange_requests").add({
            "user_name":userName,
            "item_name":itemName,
            "description":description,
            "exchange_id":randomExchange
        })
        this.setState({
            itemName:'',
            description:''
        })
        return Alert.alert(
            'Item ready to exchange',
            '',
            [
                {text:'OK', onPress:()=>{
                    this.props.navigation.navigate('HomeScreen')
                }}
            ]
        );
    }

    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader title = 'Add Item'/>
                <KeyboardAvoidingView style = {styles.keyBoardStyle}>
                    <TextInput style = {styles.itemInfo}
                    placeholder = {'Item Name'}
                    onChangeText = {(text)=>{
                        this.setState({itemName:text})
                    }}
                    value = {this.state.itemName}/>

                    <TextInput style = {styles.itemInfo}
                    placeholder = {'Description'}
                    onChangeText = {(text)=>{
                        this.setState({description:text})
                    }}
                    value = {this.state.description}/>

                    <TouchableOpacity style = {[styles.button,{marginTop:10}]}
                    onPress = {()=>{
                        this.addItem(this.state.itemName,this.state.description)
                    }}>
                        <Text style = {{color:'white',fontSize:18,fontWeight:'bold'}}>ADD ITEM</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    itemInfo:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    },
    button:{
        width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    
    },
})