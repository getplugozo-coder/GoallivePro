// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAy2obWW8Mbcbyn1YPmH1VHVic-I4KIQU",
  authDomain: "goallive-pro.firebaseapp.com",
  projectId: "goallive-pro",
  storageBucket: "goallive-pro.firebasestorage.app",
  messagingSenderId: "64719827074",
  appId: "1:64719827074:web:682fcb42cbd234a3c3449b",
  measurementId: "G-049HKW4QYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);