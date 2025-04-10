import React, { useState, useEffect } from 'react';
import { Link,useParams } from "react-router-dom";

import '../css/selectionBox.css';
import '../css/miniBox.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { db, auth } from '../Firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Forgot from './Forgot.js';
import About from '../About.js';
import MenuBar from '../MenuBar.js';
import LoginBar from './LoginBar.js';
import plusImg from '../imgs/orangePlus.png';
import { fetchProductInfo } from './getProductInfo.js';
import Filters from './Filters.js';
import ShowFilters from './Filters.js';


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

const BrowseParts =()=>{
    const {type}=useParams();


    return(
       
        <ShowFilters part={type}/>
        

    )

    
}

export default BrowseParts;