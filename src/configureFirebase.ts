// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQvuLbZwFZRkLUZxlSrTuAI-f_AyGOHow",
    authDomain: "cohort4-auth-demo.firebaseapp.com",
    projectId: "cohort4-auth-demo",
    storageBucket: "cohort4-auth-demo.appspot.com",
    messagingSenderId: "345772658332",
    appId: "1:345772658332:web:2728199a268e8e3874a759"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();