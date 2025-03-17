// Import Firebase and the modules we are using (Firestor and Authentication)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebaes/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Firebase Config 
// If deleted tell Zach, the codes here are project bound
const firebaseConfig = {
    apiKey: "AIzaSyD1uxBhi_ALmaIad776BMlpgjis2FVhwMI",
    authDomain: "pcpicker-c7ea8.firebaseapp.com",
    projectId: "pcpicker-c7ea8",
    storageBucket: "pcpicker-c7ea8.firebasestorage.app",
    messagingSenderId: "396116932878",
    appId: "1:396116932878:web:052ca196acfdc1366eff5f"
  };

// Initialize Firebase and the modules
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export these for other files
export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };