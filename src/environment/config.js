const firebase = require("firebase");
require("firebase/firestore");
require('firebase/auth')
require('firebase/firestore')
require('firebase/functions')

const firebaseConfig = {
  apiKey: "AIzaSyB33DVtGNP1BRllqAGU47oO1boaOhBYVmw",
  authDomain: "pretty-way.firebaseapp.com",
  databaseURL: "https://pretty-way.firebaseio.com",
  projectId: "pretty-way",
  storageBucket: "pretty-way.appspot.com",
  messagingSenderId: "935207841833",
  appId: "1:935207841833:web:8efca02d53a2405d082c38",
  measurementId: "G-V0PC5BN6CW"
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

module.exports = exports = {
  db,
  auth,
  storage,
  functions
}
