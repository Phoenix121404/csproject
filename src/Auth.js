import { auth, db,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "./Firebase.js";
import { Link,useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
// Sign up a new user
const signUp=async(email, password) =>{
     createUserWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {
        console.log("User Created:", userCredential.user);
        const user=userCredential.user;
        setDoc(doc(db, "users", user.uid), {
        cpu: "",
        gpu: "",
        motherboard: "",
        ram: "",
        cooler: "",
        power: "",
        case: "",

        })

    })

    .catch((error) => {
        console.log("Sign Up Error:", error.message);
    })
    
    
    



}

// Sign in a user
function signIn(email, password) {
   


    signInWithEmailAndPassword(auth, email, password)
    
    .then((userCredential) => {
        

        console.log("User Signed In:", userCredential.user);
    })

    .catch((error) => {
        console.log("Sign Ip Error:", error.message);
    })
   
}

// Sign out a user
function logOut() {
    signOut(auth)
    .then (() => {
        console.log("User Signed Out");
    })

    .catch((error) => {
        console.error("Sign Out Error:", error.message);
    })
}

export { signUp, signIn, logOut };