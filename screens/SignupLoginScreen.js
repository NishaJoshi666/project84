import React ,{Component} from 'react';
import {View , Text, TextInput , StyleSheet, TouchableOpacity, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import BarterSystem from '../component/BarterSystem';

export default class SignupLoginScreen extends Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            password:'',
            isVisible:'false',
            firstName:'',
            lastName:'',
            phoneNo:'',
            address:'',
            confirmPassword:''
        }
    }
    userSignup = (emailId,password,confirmPassword)=>{
        if(password!==confirmPassword){
            return Alert.alert('Password doesnot match\n Please try again')
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(emailId,password)
            .then((response)=>{
                db.collection('users').add({
                    first_name:this.state.firstName,
                    last_name:this.state.lastName,
                    mobile_number:this.state.phoneNo,
                    email_address:this.state.emailId,
                    address:this.state.address
                })
                return Alert.alert(
                    'User Added Successfully',
                    '',
                    [
                        {text:'OK', onPress:()=>this.setState({isVisible:false})}
                    ]
                );
            })
            .catch(function(error){
                var errorCode = error.code;
                var errorMessge = error.message;
                return Alert.alert(errorMessge)
            });
        }
    }
    userLogin = (emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then((response)=>{
            this.props.navigation.navigate('HomeScreen')
        })
        .catch(function(error){
            var errorCode = error.errorCode
            var errorMessage = error.errorMessage
            return Alert.alert(errorMessage)
        })
    }

    showModal=()=>{
        return(
            <Modal
            animationType = 'fade'
            transparent = {true}
            visible = {this.state.isVisible}>
                <View style = {styles.popUp}>
                    <ScrollView style = {{width:'100%'}}>
                        <KeyboardAvoidingView style = {styles.keyBoard}>
                            <Text style = {styles.popupTitle}>SIGN UP</Text>
                            <TextInput style = {styles.signupText}
                            placeholder = {'First Name'}
                            maxLength = {10}
                            onChangeText = {(text)=>{
                                this.setState({
                                    firstName:text
                                })
                            }}/>

                            <TextInput style = {styles.signupText}
                            placeholder = {'Last Name'}
                            maxLength = {10}
                            onChangeText = {(text)=>{
                                this.setState({
                                    lastName:text
                                })
                            }}/>

                            <TextInput style = {styles.signupText}
                            placeholder = {'Phone Number'}
                            maxLength = {10}
                            keyboardType = {'numeric'}
                            onChangeText = {(text)=>{
                                this.setState({
                                    phoneNo:text
                                })
                            }}/>

                            <TextInput style = {styles.signupText}
                            placeholder = {'Address'}
                            multiline = {true}
                            onChangeText = {(text)=>{
                                this.setState({
                                    address:text
                                })
                            }}/>

                            <TextInput style = {styles.signupText}
                            placeholder = {'E-Mail Address'}
                            keyboardType = {'email-address'}
                            onChangeText = {(text)=>{
                                this.setState({
                                    emailId:text
                                })
                            }}/>

                            <TextInput style = {styles.signupText}
                            placeholder = {'Password'}
                            secureTextEntry = {true}
                            onChangeText = {(text)=>{
                                this.setState({
                                    password:text
                                })
                            }}/>

                            <TextInput style = {styles.signupText}
                            placeholder = {'Confirm Password'}
                            secureTextEntry = {true}
                            onChangeText = {(text)=>{
                                this.setState({
                                    confirmPassword:text
                                })
                            }}/>

                            <View>
                                <TouchableOpacity style = {styles.signupButton}
                                onPress = {()=>
                                    this.userSignup(this.state.emailId,this.state.password,this.state.confirmPassword)
                                }>
                                    <Text style = {styles.signupButtonText}>SIGNUP</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity style = {styles.cancelButton}
                                onPress = {()=>{
                                    this.setState({
                                        isVisible:false
                                    })
                                }}>
                                    <Text style = {styles.cancelButtonText}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.profileContainer}>{this.showModal()}</View>
                <View style = {styles.profileContainer}>
                    <Text style = {styles.title}>Barter System</Text>
                </View>
                <KeyboardAvoidingView style = {styles.keyBoard}>
                <View style = {styles.buttonContainer}>
                    <TextInput style = {styles.loginBox}
                    placeholder = {'Username'}
                    keyboardType = {'email-address'}
                    onChangeText = {(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}/>

                    <TextInput style = {styles.loginBox}
                    placeholder = {'enter password'}
                    secureTextEntry = {true}
                    onChangeText = {(text)=>{
                        this.setState({
                            password:text
                        })
                    }}/>

                    <TouchableOpacity style = {styles.button} 
                    onPress={()=>
                        this.userLogin(this.state.emailId,this.state.password)
                    }>
                        <Text style = {styles.buttontext}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button}
                    onPress={()=>{
                        this.setState({
                            isVisible:true
                        })
                    }}>
                        <Text style = {styles.buttontext}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{ 
        flex:1, 
        backgroundColor:'lightblue' 
    }, 
        profileContainer:{  
            justifyContent:'center', 
            alignItems:'center', 
        }, 
        title :{ 
            fontSize:55, 
            fontWeight:'300', 
            paddingBottom:30, 
            color : '#ff3d00' 
        }, 
        loginBox:{ 
            width: 300, 
            height: 40, 
            borderBottomWidth: 1.5, 
            borderColor : 'black', 
            fontSize: 20, 
            margin:20, 
            paddingLeft:10 
        },
        button:{
            width:300, 
            height:50, 
            justifyContent:'center', 
            alignItems:'center', 
            borderRadius:25, 
            backgroundColor:"#ff9800", 
            shadowColor: "#000", 
            shadowOffset: { width: 0, height: 8, }, 
            shadowOpacity: 0.30, 
            shadowRadius: 10.32, 
            elevation: 16,
            marginBottom:10 
        }, 
        buttontext:{ 
            color:'white', 
            fontSize:18, 
            fontWeight:'bold' 
        }, 
        buttonContainer:{ 
            flex:1, 
            alignItems:'center' 
        },
        signupText:{    
            width:"75%",    
            height:45,    
            alignSelf:'center',    
            borderColor:'#ffab91',    
            borderRadius:10,    
            borderWidth:1,    
            marginTop:20,    
            padding:10  
        },
        popUp:{
            flex:1,
            borderRadius:20,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'white',
            marginLeft:30,
            marginRight:30,
            marginTop:80,
            marginBottom:80
        },
        keyBoard:{
            justifyContent:'center',
            alignItems:'center',
            flex:1
        },
        popupTitle:{
            justifyContent:'center',
            alignSelf:'center',
            fontSize:30,
            margin:50,
            color:'black'
        },
        signupButtonText:{    
            color:'blue',    
            fontSize:15,    
            fontWeight:'bold'  
        },
        signupButton:{    
            width:200,    
            height:40,    
            alignItems:'center',    
            justifyContent:'center',    
            borderWidth:1,    
            borderRadius:10,    
            marginTop:30  
        },
        cancelButton:{    
            width:200,    
            height:40,    
            justifyContent:'center',    
            alignItems:'center',    
            marginTop:5, 
            borderWidth:1,
            borderRadius:10,
            marginTop:15,
            margin:6 
        },
        cancelButtonText:{
            color:'red',    
            fontSize:15,    
            fontWeight:'bold'  
        },
})