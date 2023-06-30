// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlalGnpv8wm-mIierQlaD0hoW9Uyy77aI",
  authDomain: "blog-d449b.firebaseapp.com",
  projectId: "blog-d449b",
  storageBucket: "blog-d449b.appspot.com",
  messagingSenderId: "370720764355",
  appId: "1:370720764355:web:6918b4dcdb6d9cfa460d76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);