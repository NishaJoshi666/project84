import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class MyHeader extends Component{
  constructor(props){
    super(props);
      this.state={
        value='',
      }
    }
  }

getNumberOfUnreadNotifications=()=>{
  db.colletion('all_notification')
  .where('notifications_stauts','==','unread')
  .onSnapShot((snapShot)=>{
    var unreadNotifications=snapShot.doc.map(doc=>{doc.data()})
  })
  this.setState({
    value:unreadNotifications.length
  })
}

const BellIconWithBadge=(props)=>{
  return(
    <View style={styles.container}>
      <Icon name="bell" type="font-awesome" color="blue" size={25}
      onPress={()=>{props.navigation.navigate('Notification')}}/>
      <Badge value={this.state.value} containerStyle={{position:'absolute' , top:-4 , right:-4}}/>
    </View>
  )
}

const MyHeader = props => {
  return (
    <Header
    leftComponent={<Icon name="bars" type="font-awesome" color="blue" 
    onPress={()=>{props.navigation.toggleDrawer()}}/>}
      centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      rightComponent={<BellIconWithBadge {...props}></BellIconWithBadge>}
      backgroundColor = "#eaf8fe"
    />
  );
};

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
})

export default MyHeader;
