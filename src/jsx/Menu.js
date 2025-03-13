import React, { useState,useEffect } from 'react';
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
const API_URL =
  "https://real-time-amazon-data.p.rapidapi.com/search?query=Phone&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE";

  

const Menu = () => {

  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "84b6167ba8mshc9988e1d597379bp14a64bjsnb548ea849fd2",
            "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result); // Store the data in state
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function inside useEffect
  }, []); // Empty dependency array to run only once


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
            {data ? <pre>{JSON.stringify(data,null,2)}</pre>:<p>Loading...</p>}
          </div>
          
          
          
          

        </div>
      </div>

    </div>

  )
}

export default Menu;