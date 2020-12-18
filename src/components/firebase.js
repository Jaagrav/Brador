import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBjuzaHS-svU9tHSQTY2gr4KMnpP16iuQM",
    authDomain: "the-coder-b3e19.firebaseapp.com",
    databaseURL: "https://the-coder-b3e19.firebaseio.com",
    projectId: "the-coder-b3e19",
    storageBucket: "the-coder-b3e19.appspot.com",
    messagingSenderId: "978497464036",
    appId: "1:978497464036:web:b5aecf96da6aed5006eef1",
    measurementId: "G-HP4QVLZR7X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const database = firebase.database().ref("Brador");

export {firebase, auth, database};