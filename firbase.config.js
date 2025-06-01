// firebaseConfig.js বা firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // ✅ Add this

const firebaseConfig = {
    apiKey: "AIzaSyBNOGxp8KyUK_smkeq1PT6MnUBfzqJRW6I",
    authDomain: "eviction-checkers.firebaseapp.com",
    projectId: "eviction-checkers",
    storageBucket: "eviction-checkers.firebasestorage.app",
    messagingSenderId: "767319585344",
    appId: "1:767319585344:web:8c99061d32722c2052e5a5",
    measurementId: "G-1CY4Q6NSE0",
    databaseURL: "https://eviction-checkers-default-rtdb.firebaseio.com", // ✅ MUST HAVE THIS
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app); // ✅ Export this for Realtime DB
