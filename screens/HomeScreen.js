import React ,{Component} from 'react';
import {View , Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import MyHeader from '../component/MyHeader';
import db from '../config';
import firebase from 'firebase';
import {ListItem} from 'react-native-elements';

export default class HomeScreen extends Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allRequest:[]
        }
        this.requestRef = null
    }

    itemRequest = ()=>{
        this.requestRef = db.collection('exchange_requests')
        .onSnapshot((snapShot)=>{
            var itemList = snapShot.docs.map((doc)=>doc.data())
            this.setState({
                allRequest:itemList
            })
        })
    }

    componentDidMount(){
        this.itemRequest()
    }
    
    componentWillUnmount(){
        this.requestRef()
    }


    keyExtractor = (item,index)=>index.toString()
    
    renderItem = ({item,i})=>{
        return(
            <ListItem
            key={i}
            title={item.item_name}
            subtitle={item.description}
            titleStyle={{color:'black',fontWeight:'bold'}}
            rightElement={
                <TouchableOpacity style={styles.button}
                onPress = {()=>{
                    this.props.navigation.navigate("UserDetails",{"details":item})
                }}>
                    <Text style = {{color:'#ffff',fontSize:15}}>Exchange</Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }

    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader title = 'HomeScreen' navigation ={this.props.navigation}/>
                <View style={{flex:1}}>
                    {this.state.allRequest.length===0?(
                    <View style = {styles.subContainer}>
                        <Text style = {{fontSize:20}}>List of All Requested items</Text>
                    </View>):(
                        <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.allRequest}
                        renderItem = {this.renderItem}/>
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
       borderRadius:10
    }
  })