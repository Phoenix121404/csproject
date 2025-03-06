import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/box.css'
import Home from '../Home.js';
import About from '../About.js';
import { BrowserRouter as Router, Routes, Route,useLocation,useNavigate } from 'react-router-dom';

const handleCreate=async()=>{

}

const Forgot=()=>{
    const [email, setEmail] = useState('');
      const [pass, setPass] = useState('');
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/forgot"element={<Forgot />} />
        </Routes>
  return(
    <div className="contain">
        <div className="informationBox">
            <h2>Register</h2>

            <div className="textboxCont">
            <input type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"></input>

          <input type="text"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter password"></input>

            
            </div>
            <button onClick={handleCreate} className="buttonCreate">Create Account</button>

            <p className="dont">Already Have an Account? <Link to="/" className="sign">Login</Link></p>
        </div>
    </div>
    
  )
}

export default Forgot;