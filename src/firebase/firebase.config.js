// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlS5uf-NGUoywWCZuvFGRmDBKJ6vF8Am4",
  authDomain: "house-marketplace-projec-a23af.firebaseapp.com",
  projectId: "house-marketplace-projec-a23af",
  storageBucket: "house-marketplace-projec-a23af.appspot.com",
  messagingSenderId: "757468524793",
  appId: "1:757468524793:web:d001d7f14e971a22a9b228"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()