import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCNw9KI_r3LGZplzV57ZE3LoW5mFU72Jic",
    authDomain: "rex-website-b3eae.firebaseapp.com",
    projectId: "rex-website-b3eae",
    storageBucket: "rex-website-b3eae.appspot.com",
    messagingSenderId: "476405872600",
    appId: "1:476405872600:web:09cc101dff14baa444a4ad",
    measurementId: "G-X8GFBM5R7J"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;