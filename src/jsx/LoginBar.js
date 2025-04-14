import React from 'react';
import '../MenuBar.css'  // Import external CSS file
import { Link } from 'react-router-dom';
import logo from '../imgs/ProjLogo.png'

const LoginBar=()=>{
    return(
        <nav className="navbar">
            <h2 className="logo">
                PC Picker
            </h2>
            <div className="menu">
            <Link to="/menu">Home</Link>
            </div>
            <div>
            <img src={logo}
                alt="Logo"
                style={{width: '50px',height:'50px'}}
                className="navbar-logo"
                />
            </div>
                
        </nav>

    )
}

export default LoginBar