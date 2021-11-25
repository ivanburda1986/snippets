//Firebase
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyD8Of4l4APOh8LcHCBdBrRGuG47WRe54G8",
  authDomain: "snippets-75e57.firebaseapp.com",
  databaseURL: "https://snippets-75e57-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "snippets-75e57",
  storageBucket: "snippets-75e57.appspot.com",
  messagingSenderId: "47799834250",
  appId: "1:47799834250:web:d1f55842c578c6faec3f73",
  measurementId: "G-37CLZRWQBM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
