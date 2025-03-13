import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import '../css/selectionBox.css';
import '../css/miniBox.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Forgot from './Forgot.js';
import About from '../About.js';
import MenuBar from '../MenuBar.js';
import LoginBar from './LoginBar.js';
import plusImg from '../imgs/orangePlus.png';
import {fetchProductInfo}from './getProductInfo.js';




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
const API_URL =//test query
  "https://real-time-amazon-data.p.rapidapi.com/search?query=Phone&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE";

  function ProductPage({ asin }) {
    const [productData, setProductData] = useState(null);//use states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!asin) return;//return if not found
  
      const loadProduct = async () => {
        try {
          const data = await fetchProductInfo(asin);//wait for info to return
          setProductData(data);//set data
        } catch (err) {//error handling
          setError("Failed to load product data.");
        } finally {
          setLoading(false);//done loading
        }
      };
  
      loadProduct();//call function
    }, [asin]);
  
    if (loading) return <p>Loading product...</p>;//dynamic use states
    if (error) return <p>{error}</p>;
    if (!productData) return <p>No product found.</p>;
  
    return (//display product
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
        <img
          src={productData.data.product_photo || "https://via.placeholder.com/150"}//display image photo
          alt={productData.data.product_title || "Product"}//alternate to photo
          style={{ width: "75px", height: "75px" }}//size
        />
        <div>
          <p>{productData.data.product_information.Series}</p>
          <p>Price: {productData.data.product_price? `$${productData.data.product_price}` : "Unavailable"}</p>
        </div>
        
      </div>//display title and price
    );
  }

const Menu = () => {

  const [data, setData] = useState(null);
  const asin="B0CGJDKLB8";




  return (
    /*overall container*/
    <div className="container">

      <AppContent />
      <div className="information-box">

        <h2>Click a part to Select</h2>
        <div className="minicont">
          <div className="mini-info">
            <h2>CPU</h2>
            <ProductPage asin={asin}/>



            
          </div>
          <div className="mini-info">
            <h2>GPU</h2>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px" }}>
              <img src={plusImg}
                alt="plus"
                style={{ width: '75px', height: '75px' }}
              />
              <button className="button">Select</button>
            </div>

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
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
          </div>





        </div>
      </div>

    </div>

  )
}

export default Menu;