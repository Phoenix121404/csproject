import React from 'react';
import './MenuBar.css';  // Import external CSS file
import { Link } from 'react-router-dom';

const MenuBar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">PC Picker</h2>
      <div className="menu">
      <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default MenuBar;