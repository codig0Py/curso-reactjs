import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbZ60mKk6ict5jZyDEmweKdTYMxMuSbh0",
    authDomain: "curso-reactjs-e6cc0.firebaseapp.com",
    databaseURL: "https://curso-reactjs-e6cc0.firebaseio.com",
    projectId: "curso-reactjs-e6cc0",
    storageBucket: "curso-reactjs-e6cc0.appspot.com",
    messagingSenderId: "454053051418",
    appId: "1:454053051418:web:116dc3b700868fc44d25a3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
