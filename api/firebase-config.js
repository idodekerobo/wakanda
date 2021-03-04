import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

// Optionally import the services that you want to use
// import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyAiltIDwkHRZit62u1Dak56smA4Q4_b3T0",
   authDomain: "wakanda-94a15.firebaseapp.com",
   databaseURL: "https://wakanda-94a15.firebaseio.com",
   projectId: "wakanda-94a15",
   storageBucket: "wakanda-94a15.appspot.com",
   messagingSenderId: "871071266977",
   appId: "1:871071266977:web:0d254e9fbe7197f28fd8e0",
   measurementId: "G-3CR409F55C"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { firebase, db, auth };