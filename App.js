/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  FlatList
} from 'react-native';
import * as firebase from 'firebase';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5W8-K48T9iF_cveVyqIfSy1sEeOE7XsE",
  authDomain: "fire-90044.firebaseapp.com",
  databaseURL: "https://fire-90044.firebaseio.com",
  projectId: "fire-90044",
  storageBucket: "",
  messagingSenderId: "14966763057",
  appId: "1:14966763057:web:791ee8fc2e14ce8745af10"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)


 class App extends Component{
   constructor(props){
     super(props);
     this.state = {
       message :'',
       messages: []
     }
     this.addItem = this.addItem.bind(this);
   }
   addItem(){
    if (!this.state.message) 
    return;
    
        const newMessage = firebase.database().ref()
                              .child("messages")
                              .push();
        newMessage.set(this.state.message, () => this.setState({message: ''}))
   }
   componentDidMount(){
     firebase
     .database()
     .ref()
     .child("messages")
     .once("value",snapshot => {
       const data = snapshot.val()
       if(snapshot.val()){
         const initMessages = [];
         Object
         .keys(data)
         .forEach(message => initMessages.push(data[message]) ) ;
         this.setState({
           messages: initMessages
         })
       }
     })
     firebase
     .database()
     .ref()
     .child("messages")
     .on("child_added", snapshot => {
       const data = snapshot.val();
       if (data) {
         this.setState(prevState => ({
           messages: [data, ...prevState.messages]
         }))
       }
     })

   }
  render(){
    return(
      <View style = {styles.container}>
         <View style = {styles.msgbox}>
            <TextInput placeholder = 'Enter your message'
                       onChangeText = { (text) => this.setState({message: text})}
                       value={this.state.message}
                       style = {styles.txtinput}
           />
       
          <Button title = 'send'
                  onPress = {this.addItem}
          />

        </View>
        <FlatList data={this.state.messages}
          renderItem={
            ({item}) => 
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>
                {item}
              </Text>
            </View>
          }
          />
        </View>
    )
  }
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#eee',
  //  marginTop: 23
 },
 msgbox: {
   flexDirection: 'row',
   padding: 20,
   backgroundColor: '#fff'
 },
 txtinput: {
   flex: 1
 },
 listItemContainer: {
   backgroundColor: '#fff',
   margin: 5,
   borderRadius: 5
 },
 listItem: {
   margin: 20,
   padding: 10
 }
});

export default App;
