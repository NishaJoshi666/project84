import React ,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CustomSideBarMenu extends Component{
    render(){
        return(
            <View style = {{flex:1}}>
                <DrawerItems {...this.props}/>
                <View style = {{flex:1,justifyContent:'flex-end',paddingBottom:30}}>
                    <TouchableOpacity style = {{justifyContent:'center',alignItems:'center',padding:10,height:30,width:'80%',backgroundColor:'orange',borderRadius:10,marginLeft:25}}
                    onPress = {()=>{
                        this.props.navigation.navigate('SignupLoginScreen')
                        firebase.auth().signOut()
                    }}>
                        <Text>LOG OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}