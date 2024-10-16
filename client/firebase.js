// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lancet-eee96.firebaseapp.com",
  projectId: "lancet-eee96",
  storageBucket: "lancet-eee96.appspot.com",
  messagingSenderId: "1052916791152",
  appId: "1:1052916791152:web:b9e6552562e71ec54c41b5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);