import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './css/box.css'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Forgot from './jsx/Forgot.js'
import About from './About.js';
import Menu from './jsx/Menu.js'
import MenuBar from './MenuBar.js';
import LoginBar from './jsx/LoginBar.js'

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
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');



  //routes for the site
  

  return (
    
    <div className="contain">
      <AppContent />
      <LogBar />
      <div className="informationBox">
        <h2>Login</h2>




        <div className="textboxCont">

          <input type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"></input>

          <input type="text"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter password"></input>

          <Link to="/menu" className="forgor">Forgot your password?</Link>

          
        </div>
        <button onClick={handleLogin} className="button">Login</button>

          <p className="dont">Don't Have an Account? <Link to="/forgot" className="sign">Sign up</Link></p>



      </div>

    </div>
  );
};

export default Home;