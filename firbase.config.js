// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNOGxp8KyUK_smkeq1PT6MnUBfzqJRW6I",
    authDomain: "eviction-checkers.firebaseapp.com",
    projectId: "eviction-checkers",
    storageBucket: "eviction-checkers.firebasestorage.app",
    messagingSenderId: "767319585344",
    appId: "1:767319585344:web:8c99061d32722c2052e5a5",
    measurementId: "G-1CY4Q6NSE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);