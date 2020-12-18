import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem,Icon } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class NotificationScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      AllNotifications : []
    }
  this.requestRef= null
  }

  getNotifications =()=>{
    this.requestRef = db.collection("all_notifications")
    .where('notification_status','==','unread')
    .where('targetted_user_id','==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var AllNotifications = []
      snapshot.docs.map((doc) =>{
          var notifications=doc.data();
          AllNotifications.push(notifications)
      })
      this.setState({
        AllNotifications:AllNotifications,
      })
    })
  }
  

  componentDidMount(){
    this.getNotifications();
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        leftElement={<Icon name='book' type='font-awesome' color='black'/>}
        title={item.book_name}
        subtitle={item.message}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    )
  }
  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Donate Books" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.AllNotifications.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>You Have No Notifications</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.AllNotifications}
                renderItem={this.renderItem}
              />
            )
          }
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
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
