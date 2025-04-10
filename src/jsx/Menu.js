import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import '../css/selectionBox.css';
import '../css/miniBox.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { db, auth } from '../Firebase.js';
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import Forgot from './Forgot.js';
import About from '../About.js';
import MenuBar from '../MenuBar.js';
import LoginBar from './LoginBar.js';
import plusImg from '../imgs/orangePlus.png';
import { fetchProductInfo } from './getProductInfo.js';




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

//this function will return the users selection
//product data is stored in productData
//handleRemoval function will remove the users selection from firebase and reload the page
//useEffect is where we use the product asin to ask the api for information,then set the result to productData
//the return takes the data we received, and displays in on the page
function ProductPage({ asin, componentType }) {
  const [productData, setProductData] = useState(null);//use states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate=useNavigate();
  const handleRemoval = async (componentType) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
  
    const userDocRef = doc(db, "users", user.uid);
  
    try {
      let updateData = {};
      if (componentType === "CPU") {
        updateData.cpu = "";
      }else if(componentType==="GPU"){
        updateData.gpu="";
      }else if(componentType==="RAM"){
        updateData.ram="";
      }else if(componentType==="cooler"){
        updateData.cooler="";
      }else if(componentType==="PSU"){
        updateData.power="";
      }else if(componentType==="case"){
        updateData.case="";
      }else if(componentType==="Mother"){
        updateData.motherboard="";
      }
      await updateDoc(userDocRef, updateData);
  
      window.location.reload();
  
  
    } catch (error) {
      console.error(error);
    }
    navigate("/menu");
  }

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
        <p>{productData.data.product_information.Series||productData.data.product_information.Processor}</p>
        <p>{productData.data.product_title}</p>
        <p>Price: {productData.data.product_price ? `$${productData.data.product_price}` : "Unavailable"}</p>
        
      </div>
      <div>
        <button className="button" onClick={() => handleRemoval(componentType)} >Remove</button>
      </div>

    </div>//display title and price
  );
}


//the exported function
//constants gather the current user, their data
//gotobrows takes you to the part browsing page for the relevent part that is passed to it
//the useEffect gathers the users document from firebase
//the return is the display for the page, we check if they have a product saved, if not we display
//the default box, if they do we gather it using the ProductPage function

const Menu = () => {

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const asin = "B0CGJDKLB8";//test prod

  const navigate = useNavigate();

  const GoToBrowse = (type) => {
    navigate(`/browse/${type}`)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);//get the document
          const docSnap = await getDoc(docRef);//assign the document

          if (docSnap.exists()) {//set the data 
            setUserData(docSnap.data());
          } else {
            console.log("doc not found");
          }
        } catch (error) {
          setError("error fetching data: " + error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchUserData();//call

  }, [user]);

  if (isLoading) {//dynamic usestates
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Please log in</div>;  // If the user is not authenticated
  }

  if (error) {
    return <div>{error}</div>;  // Show any error messages
  }

  const userCPUVal = userData ? userData.cpu : "";//get cpu val
  const userGPUVal=userData ? userData.gpu: "";//get gpu val
  const userMotherVal=userData ? userData.motherboard: "";
  const userRAMVal=userData ? userData.ram:"";
  const usercoolerVal=userData? userData.cooler:"";
  const userPSUVal=userData? userData.power:"";
  const userCaseVal=userData?userData.case:"";

  return (
    /*overall container*/
    <div className="container">

      <AppContent />
      <div className="information-box">

        <h2>Click a part to Select</h2>
        <div className="minicont">
          <div className="mini-info">
            <h2>CPU</h2>
            {userCPUVal === "" ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
                <img src={plusImg}
                  alt="plus"
                  style={{ width: '75px', height: '75px' }}
                />
                
                <button onClick={() => GoToBrowse("CPU")} className="button">Select</button>
              </div>

            ) : (
              <ProductPage asin={userCPUVal} componentType="CPU" />
            )}
          </div>
          <div className="mini-info">
            <h2>GPU</h2>
            {userGPUVal===""?(
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
              <img src={plusImg}
                alt="plus"
                style={{ width: '75px', height: '75px' }}
              />
              <button onClick={() => GoToBrowse("GPU")} className="button">Select</button>
            </div>
            ):(
              <ProductPage asin={userGPUVal}componentType="GPU"/>

            )}
            

          </div>
          <div className="mini-info">
            <h2>Motherboard</h2>
            {userMotherVal===""?(
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
              <img src={plusImg}
                alt="plus"
                style={{ width: '75px', height: '75px' }}
              />
              <button onClick={() => GoToBrowse("Mother")} className="button">Select</button>
            </div>

            ):(
              <ProductPage asin={userMotherVal}componentType="Mother"/>
            )}
          </div>
          <div className="mini-info">
            <h2>RAM</h2>
            {userRAMVal===""?(
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
              <img src={plusImg}
                alt="plus"
                style={{ width: '75px', height: '75px' }}
              />
              <button onClick={() => GoToBrowse("RAM")} className="button">Select</button>
            </div>

            ):(
              <ProductPage asin={userRAMVal}componentType="RAM"/>
            )}

          </div>
          <div className="mini-info">
            <h2>Cooler</h2>
            {usercoolerVal===""?(
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
              <img src={plusImg}
                alt="plus"
                style={{ width: '75px', height: '75px' }}
              />
              <button onClick={() => GoToBrowse("cooler")} className="button">Select</button>
            </div>

            ):(
              <ProductPage asin={usercoolerVal}componentType="cooler"/>
            )}

          </div>
          <div className="mini-info">
            <h2>Power Supply</h2>
            {userPSUVal===""?(
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
              <img src={plusImg}
                alt="plus"
                style={{ width: '75px', height: '75px' }}
              />
              <button onClick={() => GoToBrowse("PSU")} className="button">Select</button>
            </div>

            ):(
              <ProductPage asin={userPSUVal}componentType="PSU"/>
            )}

          </div>
          <div className="mini-info">
            <h2>Case</h2>
            {userCaseVal===""?(
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
              <img src={plusImg}
                alt="plus"
                style={{ width: '75px', height: '75px' }}
              />
              <button onClick={() => GoToBrowse("case")} className="button">Select</button>
            </div>

            ):(
              <ProductPage asin={userCaseVal}componentType="case"/>
            )}
          </div>





        </div>
      </div>

    </div>

  )
}

export default Menu;