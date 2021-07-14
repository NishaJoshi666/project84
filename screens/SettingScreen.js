import React ,{Component} from 'react';
import {View , Text, TextInput , StyleSheet, TouchableOpacity, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../component/MyHeader'

export default class SettingScreen extends Component{
    constructor(){
        super();
        this.state={
            firstName:'',
            lastName:'',
            contactNumber:'',
            address:'',
            emailId:'',
            docId:''
        }
    }

    getData=()=>{
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_address','==',email).get()
        .then(snapShot=>{
            snapShot.forEach(doc=>{
                var data = doc.data()
                this.setState({
                    firstName:data.first_name,
                    lastName:data.last_name,
                    contactNumber:data.mobile_number,
                    address:data.address,
                    emailId:data.email_address,
                    docId:doc.id
                })
            })
        })
    }

    updateData=()=>{
        db.collection('users').doc(this.state.docId).update({
            'first_name':this.state.firstName,
            'last_name':this.state.lastName,
            'address':this.state.address,
            'mobile_number':this.state.contactNumber
        })
        Alert.alert('Profile Updated Successfully');
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        return(
            <View style={styles.container} >
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <View style={styles.formContainer}>

                    <TextInput
                    style={styles.formTextInput}
                    placeholder ={"First Name"}
                    maxLength ={8}
                    onChangeText={(text)=>{
                        this.setState({
                        firstName: text
                        })
                    }}
                    value ={this.state.firstName}
                    />

                    <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Last Name"}
                    maxLength ={8}
                    onChangeText={(text)=>{
                        this.setState({
                            lastName: text
                        })
                    }}
                    value ={this.state.lastName}
                    />

                    <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Contact"}
                    maxLength ={10}
                    keyboardType={'numeric'}
                    onChangeText={(text)=>{
                        this.setState({
                            contactNumber: text
                        })
                    }}
                    value ={this.state.contactNumber}
                    />

                    <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Address"}
                    multiline = {true}
                    onChangeText={(text)=>{
                        this.setState({
                            address: text
                        })
                    }}
                    value ={this.state.address}
                    />

                    <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.updateData()
                    }}>
                        <Text style={styles.buttonText}>UPDATE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    formContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        borderColor:'lightblue',
   },
   formTextInput:{
       width:'80%',
       height:45,
       alignSelf:'center',
       borderRadius:10,
       borderColor:'lightblue',
       borderWidth:1,
       marginTop:5,
       padding:10
   },
   button:{
       width:'80%',
       height:50,
       alignItems:'center',
       justifyContent:'center',
       borderRadius:20,
       backgroundColor:'lightblue',
       marginTop:20
   },
   buttonText:{
       fontSize:20,
       fontWeight:'bold',
       color:'white',
   }
})