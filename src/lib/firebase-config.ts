// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpLMeX0e-AoKilWY0L0BOgs1DU_WCP4_Y",
  authDomain: "booking-system-b6f70.firebaseapp.com",
  projectId: "booking-system-b6f70",
  storageBucket: "booking-system-b6f70.firebasestorage.app",
  messagingSenderId: "634876377590",
  appId: "1:634876377590:web:2cd21b396cd6615a8a6fd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)