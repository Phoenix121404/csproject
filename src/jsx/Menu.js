import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/box.css'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Forgot from './Forgot.js'
import About from '../About.js';
import MenuBar from '../MenuBar.js';
import LoginBar from './LoginBar.js'




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
    const hideOn=['/menu'];
    return(
      <>
      {!hideOn.includes(location.pathname)&&<LoginBar/>}
      </>
    )
  }

const Menu=()=>{


    return(
        <div>
            <AppContent />
            
        </div>

    )
}

export default Menu;