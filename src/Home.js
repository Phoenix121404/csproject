import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './css/box.css'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Forgot from './jsx/Forgot.js'
import About from './About.js';

const handleLogin=async()=>{

}



const Home = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  //routes for the site
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/About" element={<About />} />
    <Route path="/forgot" element={<Forgot />} />
  </Routes>
  return (
    <div className="container">
      <div className="information-box">
        <h2>Login</h2>




        <div className="textbox-cont">

          <input type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"></input>

          <input type="text"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter password"></input>

          <a href="https://google.com" className="forgor">Forgot your password?</a>

          
        </div>
        <button onClick={handleLogin} className="button">Login</button>

          <p className="dont">Don't Have an Account? <Link to="/forgot" className="sign">Sign up</Link></p>



      </div>

    </div>
  );
};

export default Home;