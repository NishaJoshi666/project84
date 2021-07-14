import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class MyHeader extends Component{
    constructor(props){
    super(props)
    this.state={
        value:'',
        userId: firebase.auth().currentUser.email
    }
    }

    BellIconWithBadge = ()=>{
        return(
          <View>
            <Icon name='bell' 
            type='font-awesome' 
            color='#696969' 
            onPress={()=>this.props.navigation.navigate('Notifications')}
            />
            <Badge value = {this.state.value}
            containerStyle={{position:'absolute',top:-4,right:-4}}/>
          </View>
        )
    }

    getNumberOfUnreadNotifications(){
        db.collection('all_notifications').where('notification_status','==','unread').where('targeted_user_id','==',this.state.userId)
        .onSnapshot(Snapshot=>{
          var unreadNotifications = Snapshot.docs.map((doc)=>doc.data())
          this.setState({
            value:unreadNotifications.length
          })
        })
    }

    componentDidMount(){
        this.getNumberOfUnreadNotifications()
    }

    render(){
        return(
            <Header
                leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
                centerComponent = {{text: this.props.title , style:{color:'red',fontWeight:'bold',fontSize:20}}}
                rightComponent = {<this.BellIconWithBadge {...this.props}/>}
                backgroundColor = 'lightblue'
            />
        )
    }
}
