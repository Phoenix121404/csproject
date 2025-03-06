import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../css/selectionBox.css';
import '../css/miniBox.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Forgot from './Forgot.js';
import About from '../About.js';
import MenuBar from '../MenuBar.js';
import LoginBar from './LoginBar.js';




const AppContent = () => {
  const location = useLocation();//get loc
  const hideMenuOn = ['/', '/forgot'];//hide menubar on login page
  return (
    <>
      {!hideMenuOn.includes(location.pathname) && <MenuBar />}

    </>
  )
  //conditional to hide menu bar if the location login is found
}
const LogBar = () => {
  const location = useLocation();
  const hideOn = ['/menu'];
  return (
    <>
      {!hideOn.includes(location.pathname) && <LoginBar />}
    </>
  )
}

const Menu = () => {


  return (
    /*overall container*/ 
    <div className="container">
      
      <AppContent />
      <div className="information-box">
        
        <h2>Click a part to Select</h2>
        <div className="minicont">
          <div className="mini-info">
            <h2>CPU</h2>
          </div>
          <div className="mini-info">
            <h2>GPU</h2>

          </div>
          <div className="mini-info">
            <h2>Motherboard</h2>
          </div>
          <div className="mini-info">
            <h2>RAM</h2>

          </div>
          <div className="mini-info">
            <h2>Cooler</h2>
          </div>
          <div className="mini-info">
            <h2>Power Supply</h2>
          </div>
          <div className="mini-info">
            <h2>Case</h2>
          </div>
          
          
          
          

        </div>
      </div>

    </div>

  )
}

export default Menu;