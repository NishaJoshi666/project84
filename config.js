import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAVYmsdP4MtvR9S05pbXUzdjrpgkkQatYQ",
  authDomain: "barter-system-app-28474.firebaseapp.com",
  databaseURL: "https://barter-system-app-28474.firebaseio.com",
  projectId: "barter-system-app-28474",
  storageBucket: "barter-system-app-28474.appspot.com",
  messagingSenderId: "1077036705858",
  appId: "1:1077036705858:web:a902772923afcbe567e5db"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();