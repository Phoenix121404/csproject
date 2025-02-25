
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Home from './Home.js';
import MenuBar from './MenuBar.js';
import LoginBar from './jsx/LoginBar.js'
import About from './About.js';
import Forgot from './jsx/Forgot.js'
import Menu from './jsx/Menu.js'

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

function App() {
  return (
    <div className="App">
      
      <Router>
      <AppContent />
      <LogBar />
      <div style={{ marginTop: '60px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgot"element={<Forgot />} />
          <Route path="/menu"element={<Menu />}/>
        </Routes>
      </div>
    </Router>
    </div>
    
  );
}

export default App;
