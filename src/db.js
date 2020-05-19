import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
// export const db = firebase
//   .initializeApp({ projectId: 'ifl-online-examination' })
//   .firestore()

const fb = firebase.initializeApp({
    apiKey: "AIzaSyC2fgMCIX3aVm60Et3iQpmhOE-sPyYT9Gw",
    authDomain: "ifl-online-examination.firebaseapp.com",
    databaseURL: "https://ifl-online-examination.firebaseio.com",
    projectId: "ifl-online-examination",
    storageBucket: "ifl-online-examination.appspot.com",
    messagingSenderId: "691349599037",
    appId: "1:691349599037:web:4c039d0070c0b9b9760b54"
})

export const db = fb.firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }


// if using Firebase JS SDK < 5.8.0