import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
  .initializeApp({ databaseURL: 'https://escom-phone-groups-default-rtdb.firebaseio.com' })
  .database()


//   var firebaseConfig = {
//     apiKey: "AIzaSyBn6-Ge6B48bZRclguTqnxMu9S_Chfb31c",
//     authDomain: "escom-phone-groups.firebaseapp.com",
//     databaseURL: "https://escom-phone-groups-default-rtdb.firebaseio.com",
//     projectId: "escom-phone-groups",
//     storageBucket: "escom-phone-groups.appspot.com",
//     messagingSenderId: "983239743525",
//     appId: "1:983239743525:web:3a3a97cad51e19412347cc",
//     measurementId: "G-LGBWRQM38M"
//   };