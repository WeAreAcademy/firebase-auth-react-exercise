// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration.  
//
// Usually, you need to fastidiously guard API keys (for example, by 
// setting the keys as environment variables); 
// however, API keys for Firebase services are ok to include in code or checked-in config files.
const firebaseConfig = {
    apiKey: "AIzaSyBBy_89aWeWJsyknhfkqC3l-x3ye_H2n5Q",
    authDomain: "academy-auth-demo.firebaseapp.com",
    projectId: "academy-auth-demo",
    storageBucket: "academy-auth-demo.appspot.com",
    messagingSenderId: "118856093981",
    appId: "1:118856093981:web:17222f12fcd856345b11f4"
};

// Initialize Firebase as a whole
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//Other auth providers include github, twitter, apple.
//These must be enabled in your firebase console.
export const googleAuthProvider = new GoogleAuthProvider();
