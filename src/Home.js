import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './css/box.css'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Forgot from './jsx/Forgot.js'
import About from './About.js';
import Menu from './jsx/Menu.js'
import MenuBar from './MenuBar.js';
import LoginBar from './jsx/LoginBar.js'
import { db,auth } from './Firebase.js';
import {setDoc,doc}from 'firebase/firestore';
import { signUp, signIn, logOut } from './Auth.js';
import { onAuthStateChanged, reload } from 'firebase/auth';



const handleLogin=async()=>{

}

const AppContent=()=>{
  const location=useLocation();//get loc
  const hideMenuOn=['/','/forgot'];//hide menubar on login page
  return(
    <>
    {!hideMenuOn.includes(location.pathname)&&<MenuBar/>} 
      
    </>
  )   
  //conditional to hide menu bar if the location login is found
}
const LogBar=()=>{
  const location=useLocation();
  const hideOn=['about'];
  return(
    <>
    {!hideOn.includes(location.pathname)&&<LoginBar/>}
    </>
  )
}

const Home = () => {

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
      // Listen for auth state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
      });

      return () => unsubscribe();
  }, []);

  const LogIn = () => {
    
    signIn(email, password);

  };

  const handleSignUp=async ()=>{
    try{
      signUp(email, password);
      
    }catch(error){
      console.error("error signing up",error.message);
      setEmail("");
      setPassword("");
    }
  };
  

  return (
    
    <div className="contain">
      <AppContent />
      <LogBar />
      <div className="informationBox">
        <h2>Login/Sign Up</h2>

        <div className="textboxCont">

        <input 
          type="email" 
          placeholder="Enter Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} />
        <input 
          type="password" 
          placeholder="Enter Password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} />

          <Link to="/menu" className="forgor">Forgot your password?</Link>

          
        </div>

        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={LogIn}>Sign In</button>
        <button onClick={logOut} style={{ display: user ? "block" : "none" }}>Sign Out</button>
        <p>{user ? `Logged in as: ${user.email}` : "Not logged in"}</p>

      </div>

    </div>
  );
};

export default Home;