import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "./Firebase.js";

// Sign up a new user
function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log("User Created:", userCredential.user);
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