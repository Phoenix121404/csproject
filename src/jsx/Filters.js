import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import '../css/selectionBox.css';
import '../css/miniBox.css';
import MenuBar from '../MenuBar.js';
import { db } from "../Firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

//this function searches for the component type using the api
//query is what the api will search on amazon
//products is the array that will hold the data we receive
//handleSelect will save the users choice
const ProductSearch = ({ query, part }) => {
    // State to store the data from the API
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track any error during the fetch

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Set loading state to true before fetching
                setLoading(true);

                const response = await fetch(query, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '84b6167ba8mshc9988e1d597379bp14a64bjsnb548ea849fd2',
                        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                if (data.data && data.data.products) {
                    setProducts(data.data.products); // Store the fetched products in the state
                } else {
                    setError('No products found'); // Handle if there are no products
                } // Store the fetched data in the state
            } catch (err) {
                setError(err.message); // Handle any error during the fetch
            } finally {
                setLoading(false); // Set loading to false when fetch is complete
            }
        };

        fetchProducts();
    }, [query]); // Empty dependency array means this effect runs only once after initial render

    const navigate = useNavigate();

    const handleSelect = async (asin) => {
        const auth = getAuth();
        const user = auth.currentUser;

        const userDocRef = doc(db, "users", user.uid);
        try {
            let updateData = {};
            if (part === "CPU") {
                updateData.cpu = asin;
            } else if (part === "GPU") {
                updateData.gpu = asin;
            } else if (part === "RAM") {
                updateData.ram = asin;
            } else if (part === "cooler") {
                updateData.cooler = asin;
            } else if (part === "PSU") {
                updateData.power = asin;
            } else if (part === "case") {
                updateData.case = asin;
            } else if (part === "mother") {
                updateData.motherboard = asin;
            }
            await updateDoc(userDocRef, updateData);

        } catch (error) {
            console.error(error);
        }
        navigate("/menu");

    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Product Search Results</h1>
            <div className="mini-cont">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, index) => (

                        <div key={index} className="browseDisplay" style={{
                            display: product.product_title.toLowerCase().includes("cable kit") || !(product.product_title.toLowerCase().includes("tower") ||
                                product.product_title.toLowerCase().includes("desktop processor") ||
                                product.product_title.toLowerCase().includes("graphics card") ||
                                product.product_title.toLowerCase().includes("ram") ||
                                product.product_title.toLowerCase().includes("power supply") ||

                                product.product_title.toLowerCase().includes("cooler")||
                                product.product_title.toLowerCase().includes("motherboard")
                            ) ? "none" : "block"
                        }}>
                            <div >
                                <div>
                                    {part === "mother" && product.product_title.toLowerCase().includes("motherboard") && (
                                        <div>
                                            <h3>{product.product_title}</h3>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
                                                <img src={product.product_photo} alt={product.product_title} style={{ width: '75px', height: '75px' }} />
                                                <p>{product.product_price}</p>
                                                <p>Rating: {product.product_star_rating}</p>
                                                <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                                                    View on Amazon
                                                </a>
                                            </div>
                                            <div>
                                                <button className="button" onClick={() => handleSelect(product.asin)}>Select</button>
                                            </div>
                                        </div>
                                    )}
                                    {part === "case" && product.product_title.toLowerCase().includes("tower") && (

                                        <div>
                                            <h3>{product.product_title}</h3>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
                                                <img src={product.product_photo} alt={product.product_title} style={{ width: '75px', height: '75px' }} />
                                                <p>{product.product_price}</p>
                                                <p>Rating: {product.product_star_rating}</p>
                                                <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                                                    View on Amazon
                                                </a>
                                            </div>
                                            <div>
                                                <button className="button" onClick={() => handleSelect(product.asin)}>Select</button>
                                            </div>
                                        </div>

                                    )}
                                    {part === "CPU" && product.product_title.toLowerCase().includes("desktop processor") && (
                                        <div>
                                            <h3>{product.product_title}</h3>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
                                                <img src={product.product_photo} alt={product.product_title} style={{ width: '75px', height: '75px' }} />
                                                <p>{product.product_price}</p>
                                                <p>Rating: {product.product_star_rating}</p>
                                                <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                                                    View on Amazon
                                                </a>
                                            </div>
                                            <div>
                                                <button className="button" onClick={() => handleSelect(product.asin)}>Select</button>
                                            </div>
                                        </div>
                                    )}
                                    {part === "GPU" && product.product_title.toLowerCase().includes("graphics card") && (
                                        <div>
                                            <h3>{product.product_title}</h3>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
                                                <img src={product.product_photo} alt={product.product_title} style={{ width: '75px', height: '75px' }} />
                                                <p>{product.product_price}</p>
                                                <p>Rating: {product.product_star_rating}</p>
                                                <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                                                    View on Amazon
                                                </a>
                                            </div>
                                            <div>
                                                <button className="button" onClick={() => handleSelect(product.asin)}>Select</button>
                                            </div>
                                        </div>
                                    )}
                                    {part === "RAM" && product.product_title.toLowerCase().includes("ram") && (
                                        <div>
                                            <h3>{product.product_title}</h3>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
                                                <img src={product.product_photo} alt={product.product_title} style={{ width: '75px', height: '75px' }} />
                                                <p>{product.product_price}</p>
                                                <p>Rating: {product.product_star_rating}</p>
                                                <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                                                    View on Amazon
                                                </a>
                                            </div>
                                            <div>
                                                <button className="button" onClick={() => handleSelect(product.asin)}>Select</button>
                                            </div>
                                        </div>
                                    )}
                                    {part === "PSU" && product.product_title.toLowerCase().includes("power supply") && (
                                        <div>
                                            <h3>{product.product_title}</h3>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
                                                <img src={product.product_photo} alt={product.product_title} style={{ width: '75px', height: '75px' }} />
                                                <p>{product.product_price}</p>
                                                <p>Rating: {product.product_star_rating}</p>
                                                <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                                                    View on Amazon
                                                </a>
                                            </div>
                                            <div>
                                                <button className="button" onClick={() => handleSelect(product.asin)}>Select</button>
                                            </div>
                                        </div>
                                    )}
                                    {part === "cooler" && product.product_title.toLowerCase().includes("cooler") && (
                                        <div>
                                            <h3>{product.product_title}</h3>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
                                                <img src={product.product_photo} alt={product.product_title} style={{ width: '75px', height: '75px' }} />
                                                <p>{product.product_price}</p>
                                                <p>Rating: {product.product_star_rating}</p>
                                                <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                                                    View on Amazon
                                                </a>
                                            </div>
                                            <div>
                                                <button className="button" onClick={() => handleSelect(product.asin)}>Select</button>
                                            </div>
                                        </div>
                                    )}




                                </div>

                            </div>

                        </div>
                    ))
                ) : (
                    <p>no data</p>
                )}
            </div>
        </div>
    );
};

//this function displays the filters for cpus
//the handle functions are updated when radio buttons are clicked to create a query
//the return is the filters and the products currently found via the filters
const CpuFiltering = () => {
    const handleIntelCheckChanged = () => {
        setFilters(prevFilters => ({
            ...prevFilters,
            intel: true,
            amd: false,
            amdGen: "",
            amdModel: "",
            intelGen: !prevFilters.intel ? prevFilters.intelGen : "" // Reset if unchecked

        }));
    }
    const handleAMDCheckChanged = () => {
        setFilters(prevFilters => ({
            ...prevFilters,
            intel: false,
            amd: true,
            intelGen: "",
            intelModel: "",
            amdGen: !prevFilters.amd ? prevFilters.amdGen : ""
        }));
    }
    const handleIntelGenChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            intelGen: event.target.value
        }));
    }
    const handleAMDGenChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            amdGen: event.target.value
        }));
    }
    const handleIntelModelChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            intelModel: event.target.value
        }));
    }
    const handleAMDModelChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            amdModel: event.target.value
        }));
    }
    const [filters, setFilters] = useState({
        intel: false,
        amd: false,

        intelGen: "",
        intelModel: "",

        amdGen: "",
        amdModel: ""
    });

    let query = '';

    if (filters.intel && filters.amd) {
        query = 'https://real-time-amazon-data.p.rapidapi.com/search?query=amd-intel-processor-chip-cpu-boxed&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=intel%2Camd&is_prime=false&deals_and_discounts=NONE';
    } else if (filters.intel) {

        if (filters.intelGen != "" && filters.intelModel != "") {
            query = `https://real-time-amazon-data.p.rapidapi.com/search?query=Intel-${filters.intelGen}${filters.intelModel}-cpu&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=intel&is_prime=false&deals_and_discounts=NONE`;
        } else if (filters.intelGen != "") {
            query = `https://real-time-amazon-data.p.rapidapi.com/search?query=${filters.intelGen}th%20gen%20intel%20cpu%20${filters.intelGen}100%20${filters.intelGen}500%20${filters.intelGen}700%20${filters.intelGen}900&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=intel&is_prime=false&deals_and_discounts=NONE`;
        } else {
            query = 'https://real-time-amazon-data.p.rapidapi.com/search?query=Intel-processor&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=intel&is_prime=false&deals_and_discounts=NONE';
        }

    } else if (filters.amd) {
        if (filters.amdGen != "" && filters.amdModel != "") {
            query = `https://real-time-amazon-data.p.rapidapi.com/search?query=amd-${filters.amdGen}${filters.amdModel}-cpu&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=amd&is_prime=false&deals_and_discounts=NONE`
        } else if (filters.amdGen != "") {
            query = `https://real-time-amazon-data.p.rapidapi.com/search?query=${filters.amdGen}th%20gen%20amd%20cpu%20${filters.amdGen}950x%20${filters.amdGen}500x%20${filters.amdGen}700x%20${filters.amdGen}600x&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=amd&is_prime=false&deals_and_discounts=NONE`

        } else {
            query = 'https://real-time-amazon-data.p.rapidapi.com/search?query=amd-chip-processor&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=amd&is_prime=false&deals_and_discounts=NONE';
        }

    } else {
        query = 'https://real-time-amazon-data.p.rapidapi.com/search?query=amd-intel-processor-chip-cpu-boxed&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=intel%2Camd&is_prime=false&deals_and_discounts=NONE'
    }


    return (
        <div className="container">
            <AppContent />
            <div className="filter-box">

                <div>
                    <div>
                        <label>
                            <input type="radio" name="cpuBrand" value="intel" checked={filters.intel} onChange={handleIntelCheckChanged} />Intel
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="cpuBrand" value="amd" checked={filters.amd} onChange={handleAMDCheckChanged} />AMD
                        </label>
                    </div>
                    <div>
                        {filters.intel && (
                            <div>
                                <div>
                                    <label>
                                        <h2>Intel Generations</h2>
                                        <input type="radio" name="intel-gen" value="14" checked={filters.intelGen === "14"} onChange={handleIntelGenChange} />14th Gen

                                    </label>
                                </div>
                                <div>
                                    <label>

                                        <input type="radio" name="intel-gen" value="13" checked={filters.intelGen === "13"} onChange={handleIntelGenChange} />13th Gen

                                    </label>
                                </div>
                                <div>
                                    <label>

                                        <input type="radio" name="intel-gen" value="12" checked={filters.intelGen === "12"} onChange={handleIntelGenChange} />12th Gen

                                    </label>
                                </div>
                                <div>
                                    <label>

                                        <input type="radio" name="intel-gen" value="11" checked={filters.intelGen === "11"} onChange={handleIntelGenChange} />11th Gen

                                    </label>
                                </div>




                            </div>


                        )}
                        {filters.amd && (
                            <div>
                                <div>
                                    <label>
                                        <h2>AMD generations</h2>
                                        <input type="radio" name="amd-gen" value="9" checked={filters.amdGen === "9"} onChange={handleAMDGenChange} /> 9000 series
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="amd-gen" value="7" checked={filters.amdGen === "7"} onChange={handleAMDGenChange} /> 7000 series
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="amd-gen" value="5" checked={filters.amdGen === "5"} onChange={handleAMDGenChange} /> 5000 series
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="amd-gen" value="3" checked={filters.amdGen === "3"} onChange={handleAMDGenChange} /> 3000 series
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        {filters.intelGen != "" && (
                            <div>
                                <div>
                                    <label>
                                        <h2>Intel Models</h2>
                                        <input type="radio" name="intel-model" value="900" checked={filters.intelModel === "900"} onChange={handleIntelModelChange} />900 series
                                    </label>
                                </div>
                                <div>
                                    <label>

                                        <input type="radio" name="intel-model" value="700" checked={filters.intelModel === "700"} onChange={handleIntelModelChange} />700 series
                                    </label>
                                </div>
                                <div>
                                    <label>

                                        <input type="radio" name="intel-model" value="500" checked={filters.intelModel === "500"} onChange={handleIntelModelChange} />500 series
                                    </label>
                                </div>
                                <div>
                                    <label>

                                        <input type="radio" name="intel-model" value="300" checked={filters.intelModel === "300"} onChange={handleIntelModelChange} />300 series
                                    </label>
                                </div>
                            </div>
                        )

                        }
                        {filters.amdGen != "" && (
                            <div>
                                <div>
                                    <label>
                                        <h2>AMD Models</h2>
                                        <input type="radio" name="amd-model" value="950x" checked={filters.amdModel === "950x"} onChange={handleAMDModelChange} />950x series
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <input type="radio" name="amd-model" value="900x" checked={filters.amdModel === "900x"} onChange={handleAMDModelChange} />900x series
                                    </label>
                                </div>
                                {filters.amdGen != "9" && filters.amdGen != "3" && (
                                    <div>
                                        <label>
                                            <input type="radio" name="amd-model" value="800x3D" checked={filters.amdModel === "800x3D"} onChange={handleAMDModelChange} />800x3D series
                                        </label>
                                    </div>
                                )}
                                <div>
                                    <label>
                                        <input type="radio" name="amd-model" value="700x" checked={filters.amdModel === "700x"} onChange={handleAMDModelChange} />700x series
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="amd-model" value="600x" checked={filters.amdModel === "600x"} onChange={handleAMDModelChange} />600x series
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="amd-model" value="500x" checked={filters.amdModel === "500x"} onChange={handleAMDModelChange} />500x series
                                    </label>
                                </div>

                            </div>
                        )}
                    </div>
                </div>


            </div>
            <div className="information-box">
                <ProductSearch query={query} part="CPU" />


            </div>
        </div>
    )
}

const GPUFiltering = () => {
    const handleNvidiaCheckChanged = () => {
        setFilters(prevFilters => ({
            ...prevFilters,
            Nvidia: true,
            Amd: false,
            AmdGenVers: "",
            AmdSKU: "",

            NvidiaVers: !prevFilters.Nvidia ? prevFilters.NvidiaVers : "" // Reset if unchecked

        }));
    }
    const handleAmdCheckChanged = () => {
        setFilters(prevFilters => ({
            ...prevFilters,
            Nvidia: false,
            Amd: true,
            NvidiaVers: "",
            NvidiaSKU: "",

            AmdGenVers: !prevFilters.Amd ? prevFilters.AmdGenVers : ""
        }));
    }
    const handleNvidiaVersionChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            NvidiaVers: event.target.value
        }));
    }
    const handleAMDVersionChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            AmdGenVers: event.target.value
        }));
    }
    const handleIntelModelChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            NvidiaSKU: event.target.value
        }));
    }
    const handleAMDModelChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            AmdSKU: event.target.value
        }));
    }
    const [filters, setFilters] = useState({
        Nvidia: false,
        Amd: false,

        NvidiaVers: "",
        AmdGenVers: "",

        NvidiaSKU: "",
        AmdSKU: ""
    });
    let query = '';

    if (filters.Nvidia && filters.Amd) {
        query = 'https://real-time-amazon-data.p.rapidapi.com/search?query=nvidia-amd-gpu-boxed&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=nvidia%2Camd%2Cmsi%2Casus&is_prime=false&deals_and_discounts=NONE';
    } else if (filters.Nvidia) {

        if (filters.NvidiaVers != "" && filters.NvidiaSKU != "") {
            query = `https://real-time-amazon-data.p.rapidapi.com/search?query=${filters.NvidiaVers}${filters.NvidiaSKU}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE`;
        } else if (filters.NvidiaVers != "") {
            query = `https://real-time-amazon-data.p.rapidapi.com/search?query=${filters.NvidiaVers}series-gpu%20gen%20nvidia%20gpu%20${filters.NvidiaVers}90%20${filters.NvidiaVers}80%20${filters.NvidiaVers}70%20${filters.NvidiaVers}60&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=nvidia%2Casus%2Cmsi&is_prime=false&deals_and_discounts=NONE`;
        } else {
            query = 'https://real-time-amazon-data.p.rapidapi.com/search?query=nvidia-gpu&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=nvidia%2Cmsi%2Casus&is_prime=false&deals_and_discounts=NONE';
        }

    } else if (filters.Amd) {
        if (filters.AmdGenVers != "" && filters.AmdSKU != "") {
            query = `https://real-time-amazon-data.p.rapidapi.com/search?query=amd-${filters.AmdGenVers}${filters.AmdSKU}-gpu-boxed&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=amd%2Cmsi%2Casus&is_prime=false&deals_and_discounts=NONE`
        } else if (filters.AmdGenVers != "") {
            query = `https://real-time-amazon-data.p.rapidapi.com/search?query=${filters.VmdGenVers}000-series%20gen%20amd%20gpu&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=amd%2Cmsi%2Casus&is_prime=false&deals_and_discounts=NONE`

        } else {
            query = 'https://real-time-amazon-data.p.rapidapi.com/search?query=amd-chip-processor&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=amd&is_prime=false&deals_and_discounts=NONE';
        }

    } else {
        query = 'https://real-time-amazon-data.p.rapidapi.com/search?query=nvidia-amd-gpu-boxed&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=nvidia%2Camd%2Casus%2Cmsi&is_prime=false&deals_and_discounts=NONE'
    }

    return (
        <div className="container">
            <AppContent />
            <div className="filter-box">
                <div>
                    <div>
                        <label>
                            <input type="radio" name="gpuBrand" value="Nvidia" checked={filters.Nvidia} onChange={handleNvidiaCheckChanged} />Nvidia
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="gpuBrand" value="Amd" checked={filters.Amd} onChange={handleAmdCheckChanged} />AMD
                        </label>
                    </div>
                </div>
                <div>
                    {filters.Nvidia && (
                        <div>
                            <div>
                                <label>
                                    <h2>Nvidia Generations</h2>
                                    <input type="radio" name="nvidia-gen" value="40" checked={filters.NvidiaVers === "40"} onChange={handleNvidiaVersionChange} />40 series

                                </label>
                            </div>
                            <div>
                                <label>

                                    <input type="radio" name="nvidia-gen" value="30" checked={filters.NvidiaVers === "30"} onChange={handleNvidiaVersionChange} />30 series

                                </label>
                            </div>
                            <div>
                                <label>

                                    <input type="radio" name="nvidia-gen" value="20" checked={filters.NvidiaVers === "20"} onChange={handleNvidiaVersionChange} />20 series

                                </label>
                            </div>
                            <div>
                                <label>

                                    <input type="radio" name="nvidia-gen" value="10" checked={filters.NvidiaVers === "10"} onChange={handleNvidiaVersionChange} />10 series

                                </label>
                            </div>




                        </div>


                    )}
                    {filters.Amd && (
                        <div>
                            <div>
                                <label>
                                    <h2>AMD generations</h2>
                                    <input type="radio" name="amd-gpu" value="9" checked={filters.AmdGenVers === "9"} onChange={handleAMDVersionChange} /> 9000 series
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="amd-gpu" value="7" checked={filters.AmdGenVers === "7"} onChange={handleAMDVersionChange} /> 7000 series
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="amd-gpu" value="6" checked={filters.AmdGenVers === "6"} onChange={handleAMDVersionChange} /> 6000 series
                                </label>
                            </div>

                        </div>
                    )}
                </div>
                <div>
                    {filters.NvidiaVers != "" && (
                        <div>
                            <div>
                                <label>
                                    <h2>Nvidia Models</h2>
                                    <input type="radio" name="nvidia-model" value="90" checked={filters.NvidiaSKU === "90"} onChange={handleIntelModelChange} />90 series
                                </label>
                            </div>
                            <div>
                                <label>

                                    <input type="radio" name="nvidia-model" value="80" checked={filters.NvidiaSKU === "80"} onChange={handleIntelModelChange} />80 series
                                </label>
                            </div>
                            <div>
                                <label>

                                    <input type="radio" name="nvidia-model" value="70" checked={filters.NvidiaSKU === "70"} onChange={handleIntelModelChange} />70 series
                                </label>
                            </div>
                            <div>
                                <label>

                                    <input type="radio" name="nvidia-model" value="60" checked={filters.NvidiaSKU === "60"} onChange={handleIntelModelChange} />60 series
                                </label>
                            </div>
                            <div>
                                <label>

                                    <input type="radio" name="nvidia-model" value="50" checked={filters.NvidiaSKU === "50"} onChange={handleIntelModelChange} />50 series
                                </label>
                            </div>
                        </div>
                    )

                    }
                    {filters.AmdGenVers != "" && (
                        <div>
                            <div>
                                <label>
                                    <h2>AMD Models</h2>
                                    {filters.AmdGenVers === "9" && (
                                        <div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="070XT" checked={filters.AmdSKU === "070XT"} onChange={handleAMDModelChange} />9070XT
                                            </div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="070" checked={filters.AmdSKU === "070"} onChange={handleAMDModelChange} />9070
                                            </div>

                                        </div>

                                    )}
                                    {filters.AmdGenVers === "7" && (
                                        <div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="900XT" checked={filters.AmdSKU === "900XT"} onChange={handleAMDModelChange} />7900XT
                                            </div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="900XTX" checked={filters.AmdSKU === "900XTX"} onChange={handleAMDModelChange} />7900XTX
                                            </div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="800XT" checked={filters.AmdSKU === "800XT"} onChange={handleAMDModelChange} />7800xt
                                            </div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="700XT" checked={filters.AmdSKU === "700XT"} onChange={handleAMDModelChange} />7700XT
                                            </div>

                                        </div>
                                    )}
                                    {filters.AmdGenVers === "6" && (
                                        <div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="950XT" checked={filters.AmdSKU === "950XT"} onChange={handleAMDModelChange} />6950XT
                                            </div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="900XT" checked={filters.AmdSKU === "900XT"} onChange={handleAMDModelChange} />6900XT
                                            </div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="800XT" checked={filters.AmdSKU === "800XT"} onChange={handleAMDModelChange} />6800xt

                                            </div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="700XT" checked={filters.AmdSKU === "700XT"} onChange={handleAMDModelChange} />6700XT
                                            </div>
                                            <div>
                                                <input type="radio" name="Amd-Model" value="600XT" checked={filters.AmdSKU === "600XT"} onChange={handleAMDModelChange} />6600XT
                                            </div>



                                        </div>
                                    )}
                                </label>
                            </div>

                        </div>
                    )}
                </div>
            </div>
            <div className="information-box">
                <ProductSearch query={query} part="GPU" />


            </div>

        </div>
    )
}

const MotherFiltering = () => {

    const handleBrandChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            Brand: event.target.value,
            Model: ""
        }));
    }
    const handleModelChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            Model: event.target.value,
            Ram: "",
            Socket: "",
            Form: ""
        }));
    }
    const handleSocketChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            Socket: event.target.value,
            Model: ""

        }));
    }
    const handleRamChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            Ram: event.target.value,
            Model: ""
        }));
    }
    const handleFormChange = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            Form: event.target.value,
            Model: ""
        }));
    }

    const [filters, setFilters] = useState({
        Brand: "",

        Model: "",

        Socket: "",
        Ram: "",
        Form: ""

    });
    let filterParts = [];
    if (filters.Brand != "") {
        filterParts.push(filters.Brand);
        filterParts.push("gaming motherboard");
    }
    if (filters.Model != "") {
        filterParts.push(filters.Model);
    }
    if (filters.Socket != "") {
        filterParts.push(filters.Socket);
    }
    if (filters.Ram != "") {
        filterParts.push(filters.Ram);
    }
    if (filters.Form != "") {
        filterParts.push(filters.Form);
    }
    let filterQuery = filterParts.length > 0
        ? `${filterParts.join("-")}`
        : "gaming motherboard";

    let query = `https://real-time-amazon-data.p.rapidapi.com/search?query=${filterQuery}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=${filters.Brand}&is_prime=false&deals_and_discounts=NONE`


    return (
        <div className="container">
            <AppContent />
            <div className="filter-box">
                <div>
                    <select name="brand" value={filters.Brand} onChange={handleBrandChange}>
                        <option value="">Select Brand</option>
                        <option value="Asus">Asus</option>
                        <option value="MSI">MSI</option>
                        <option value="Gigabyte">Gigabyte</option>
                        <option value="ASRock">ASRock</option>
                    </select>
                </div>
                <div>
                    {filters.Brand !== "" && (
                        <div>

                            {filters.Brand === "ASUS" && (
                                <div>
                                    <select name="asusModel" value={filters.Model} onChange={handleModelChange}>
                                        <option value="">Choose a model</option>
                                        <option value="ROG Maximus">ROG Maximus</option>
                                        <option value="ROG Crosshair">ROG Crosshair</option>
                                        <option value="ROG Strix">ROG Strix</option>
                                        <option value="TUF Gaming">TUF Gaming</option>
                                    </select>
                                </div>
                            )}
                            {filters.Brand === "MSI" && (
                                <div>
                                    <select name="MSIModel" value={filters.Model} onChange={handleModelChange}>
                                        <option value="">Choose a Model</option>
                                        <option value="MEG">MEG</option>
                                        <option value="MPG">MPG</option>
                                        <option value="MAG">MAG</option>

                                    </select>
                                </div>
                            )}
                            {filters.Brand === "Gigabyte" && (
                                <div>
                                    <select name="GigModel" value={filters.Model} onChange={handleModelChange}>
                                        <option value="">Choose a model</option>
                                        <option value="AORUS Xtreme">AORUS Xtreme</option>
                                        <option value="AORUS Master">AORUS Master</option>
                                        <option value="AORUS Elite">AORUS Elite</option>
                                        <option value="Gaming X">Gaming X</option>
                                    </select>
                                </div>
                            )}
                            {filters.Brand === "ASRock" && (
                                <div>
                                    <select name="ASRModel" value={filters.Model} onChange={handleModelChange}>
                                        <option value="">Choose a Model</option>
                                        <option value="Taichi">Taichi</option>
                                        <option value="Phantom Gaming">Phantom Gaming</option>
                                        <option value="Steel Legend">Steel Legend</option>
                                        <option value="Pro Series">Pro Series</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <select name="socket" value={filters.Socket} onChange={handleSocketChange}>
                        <option value="">Choose a socket</option>
                        <option value="AM4">AM4</option>
                        <option value="AM5">AM5</option>
                        <option value="LGA 1200">LGA 1200</option>
                        <option value="LGA 1700">LGA 1700</option>
                    </select>

                </div>
                <div>
                    <select name="ram" value={filters.Ram} onChange={handleRamChange}>
                        <option value="">choose a RAM type</option>
                        <option value="DDR4">DDR4</option>
                        <option value="DDR5">DDR5</option>

                    </select>
                </div>
                <div>
                    <select name="Form" value={filters.Form} onChange={handleFormChange}>
                        <option value="">choose a form factor</option>
                        <option value="ATX">ATX</option>
                        <option value="mATX">mATX</option>
                        <option value="ITX">ITX</option>
                        <option value="E-ATX">E-ATX</option>
                    </select>
                </div>

            </div>
            <div className="information-box">
                <ProductSearch query={query} part="mother" />
            </div>


        </div>
    )
}

const RAMFiltering = () => {
    const [ramFilters, setRamFilters] = useState({
        brand: "",
        size: "",
        speed: "",
        ddr: ""
    });

    const handleSelectionChange = (event) => {
        setRamFilters(prevFilters => ({
            ...prevFilters,
            brand: event.target.value
        }));
    }
    const handleSizeChange = (event) => {
        setRamFilters(prevFilters => ({
            ...prevFilters,
            size: event.target.value
        }));
    }
    const handleSpeedChange = (event) => {
        setRamFilters(prevFilters => ({
            ...prevFilters,
            speed: event.target.value
        }));
    }
    const handleDdrChange = (event) => {
        setRamFilters(prevFilters => ({
            ...prevFilters,
            ddr: event.target.value
        }));
    }
    let filterParts = [];
    if (ramFilters.brand != "") {
        filterParts.push(ramFilters.brand);

    }
    if (ramFilters.size != "") {
        filterParts.push(ramFilters.size);
    }
    if (ramFilters.ddr != "") {
        filterParts.push(ramFilters.ddr);
    }
    if (ramFilters.speed != "") {
        filterParts.push(ramFilters.speed);
    }
    let filterQuery = filterParts.length > 0
        ? `RAM-${filterParts.join("-")}`
        : "gaming ram";

    let query = `https://real-time-amazon-data.p.rapidapi.com/search?query=${filterQuery}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=${ramFilters.brand}&is_prime=false&deals_and_discounts=NONE`


    return (
        <div className="container">
            <AppContent />
            <div className="filter-box">
                <div>
                    <div>

                        <select name="brand" value={ramFilters.brand} onChange={handleSelectionChange}>
                            <option value="">Select Brand</option>
                            <option value="Corsair">Corsair</option>
                            <option value="Kingston">Kingston</option>
                        </select>
                    </div>
                    <div>
                        {ramFilters.brand != "" && (
                            <div>
                                <select name="size" value={ramFilters.size} onChange={handleSizeChange}>
                                    <option value="">Select Size</option>
                                    <option value="12GB">12GB</option>
                                    <option value="2x8GB">16GB</option>
                                    <option value="32GB">32GB</option>
                                    <option value="64GB">64GB</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div>
                        {ramFilters.size != "" && (
                            <div>
                                <select name="ddr" value={ramFilters.ddr} onChange={handleDdrChange}>
                                    <option value="">Select DDR Type</option>
                                    <option value="DDR4">DDR4</option>
                                    <option value="DDR5">DDR5</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div>
                        {ramFilters.ddr != "" && (
                            <div>
                                {ramFilters.ddr === "DDR4" && (

                                    <select name="speed" value={ramFilters.speed} onChange={handleSpeedChange}>
                                        <option value="">Select Speed</option>
                                        <option value="3000 MHz">3000 MHz</option>
                                        <option value="3200 MHz">3200 MHz</option>
                                        <option value="3600 MHz">3600 MHz</option>
                                        <option value="4000 MHz">4000 MHz</option>
                                    </select>
                                )}
                                {ramFilters.ddr === "DDR5" && (
                                    <select name="speed" value={ramFilters.speed} onChange={handleSpeedChange}>
                                        <option value="">Select Speed</option>
                                        <option value="4800 MHz">4800 MHz</option>
                                        <option value="5200 MHz">5200 MHz</option>
                                        <option value="5600 MHz">5600 MHz</option>
                                        <option value="6000 MHz">6000 MHz</option>
                                    </select>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="information-box">
                <ProductSearch query={query} part="RAM" />
            </div>
        </div>
    )
}

const CoolerFiltering = () => {
    const [coolerFilters, SetcoolerFilters] = useState({
        brand: "",
        type: ""

    })
    const handleSelectionChange = (event) => {
        SetcoolerFilters(prevFilters => ({
            ...prevFilters,
            brand: event.target.value
        }));
    }
    const handleTypeChange = (event) => {
        SetcoolerFilters(prevFilters => ({
            ...prevFilters,
            type: event.target.value
        }));
    }
    let filterParts = [];
    if (coolerFilters.brand != "") {
        filterParts.push(coolerFilters.brand);
        filterParts.push("cpu cooler")
    }
    if (coolerFilters.type != "") {
        filterParts.push(coolerFilters.type);

    }
    let filterQuery = filterParts.length > 0
        ? `${filterParts.join("-")}`
        : "cooler master/deepcool/be quiet! cpu coolers";

    let query = `https://real-time-amazon-data.p.rapidapi.com/search?query=${filterQuery}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=${coolerFilters.brand}&is_prime=false&deals_and_discounts=NONE`

    return (
        <div className="container">
            <AppContent />
            <div className="filter-box">
                <div>
                    <div>
                        <select name="brand" value={coolerFilters.brand} onChange={handleSelectionChange}>
                            <option value="">Choose a brand</option>
                            <option value="Cooler Master">Cooler Master</option>
                            <option value="DeepCool">DeepCool</option>
                            <option value="be quiet!">be quiet!</option>
                        </select>
                    </div>
                    <div>
                        <select name="type" value={coolerFilters.type} onChange={handleTypeChange}>
                            <option value="">Choose a type</option>
                            <option value="Air">Air</option>
                            <option value="Liquid">Liquid</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="information-box">
                <ProductSearch query={query} part="cooler" />

            </div>
        </div>
    )
}

const PowerFiltering = () => {
    const [PSUFilters, SetPSUFilters] = useState({
        brand: "",
        wattage: "",
        efficiency: "",
        modularity: ""

    })
    const handleSelectionChange = (event) => {
        SetPSUFilters(prevFilters => ({
            ...prevFilters,
            brand: event.target.value
        }));
    }
    const handleWattageChange = (event) => {
        SetPSUFilters(prevFilters => ({
            ...prevFilters,
            wattage: event.target.value
        }));
    }
    const handleEfficiencyChange = (event) => {
        SetPSUFilters(prevFilters => ({
            ...prevFilters,
            efficiency: event.target.value
        }));
    }
    const handlemodularityChange = (event) => {
        SetPSUFilters(prevFilters => ({
            ...prevFilters,
            modularity: event.target.value
        }));
    }
    let filterPSU = [];
    if (PSUFilters.brand != "") {
        filterPSU.push(PSUFilters.brand);
        filterPSU.push("power-supply")
    }
    if (PSUFilters.wattage != "") {
        filterPSU.push(PSUFilters.wattage);
    }
    if (PSUFilters.efficiency != "") {
        filterPSU.push(PSUFilters.efficiency);
    }
    if (PSUFilters.modularity != "") {
        filterPSU.push(PSUFilters.modularity);
    }
    let filterQuery = filterPSU.length > 0
        ? `${filterPSU.join("-")}`
        : "corsair/EVGA/Seasonic power supplies";

    let query = `https://real-time-amazon-data.p.rapidapi.com/search?query=${filterQuery}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=Corsair,EVGA,Seasonic&is_prime=false&deals_and_discounts=NONE`;

    return (
        <div className="container">
            <AppContent />
            <div className="filter-box">
                <div>
                    <div>
                        <select name="brand" value={PSUFilters.brand} onChange={handleSelectionChange}>
                            <option value="">Choose a brand</option>
                            <option value="Corsair">Corsair</option>
                            <option value="EVGA">EVGA</option>
                            <option value="Seasonic">Seasonic</option>
                        </select>
                    </div>
                    <div>
                        <select name="wattage" value={PSUFilters.wattage} onChange={handleWattageChange}>
                            <option value="">Choose a wattage</option>
                            <option value="650 watts">650W</option>
                            <option value="750 watts">750W</option>
                            <option value="850 watts">850W</option>
                            <option value="1000 watts">1000W</option>
                        </select>
                    </div>
                    <div>
                        <select name="efficiency" value={PSUFilters.efficiency} onChange={handleEfficiencyChange}>
                            <option value="">Choose an efficiency rating</option>
                            <option value="80 PLUS Bronze">80 PLUS Bronze</option>
                            <option value="80 PLUS Silver">80 PLUS Silver</option>
                            <option value="80 PLUS Gold">80 PLUS Gold</option>
                            <option value="80 PLUS Platinum">80 PLUS Platinum</option>
                            <option value="80 PLUS Titanium">80 PLUS Titanium</option>
                        </select>
                    </div>
                    <div>
                        <select name="modularity" value={PSUFilters.modularity} onChange={handlemodularityChange}>
                            <option value="">Choose modularity</option>
                            <option value="Modular">Modular</option>
                            <option value="Non-Modular">Non-Modular</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="information-box">
                <ProductSearch query={query} part="PSU" />
            </div>
        </div>
    )
}

const CaseFiltering = () => {
    const [CaseFilters, SetCaseFilters] = useState({
        brand: "",
        size: "",
        includedFans: "",
        rgb: ""

    })
    const handleSelectionChange = (event) => {
        SetCaseFilters(prevFilters => ({
            ...prevFilters,
            brand: event.target.value
        }));
    }
    const handleSizeChange = (event) => {
        SetCaseFilters(prevFilters => ({
            ...prevFilters,
            size: event.target.value
        }));
    }
    const handleFanChange = (event) => {
        SetCaseFilters(prevFilters => ({
            ...prevFilters,
            includedFans: event.target.value
        }));
    }
    const handleRGBChange = (event) => {
        SetCaseFilters(prevFilters => ({
            ...prevFilters,
            rgb: event.target.value
        }));
    }
    let filterCase = [];
    if (CaseFilters.brand != "") {
        filterCase.push(CaseFilters.brand);
        filterCase.push("gaming PC case")
    }
    if (CaseFilters.size != "") {
        filterCase.push(CaseFilters.size);
    }
    if (CaseFilters.includedFans != "") {
        filterCase.push(CaseFilters.includedFans);
    }
    if (CaseFilters.rgb != "") {
        filterCase.push(CaseFilters.rgb);
    }
    let filterQuery = filterCase.length > 0
        ? `${filterCase.join("-")}`
        : "NZXT/Lian Li/Corsair pc cases";
    let query = `https://real-time-amazon-data.p.rapidapi.com/search?query=${filterQuery}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&brand=${CaseFilters.brand}&is_prime=false&deals_and_discounts=NONE`;

    return (
        <div className="container">
            <AppContent />
            <div className="filter-box">
                <div>
                    <div>
                        <select name="brand" value={CaseFilters.brand} onChange={handleSelectionChange}>
                            <option value="">Choose a Brand</option>
                            <option value="Corsair">Corsair</option>
                            <option value="NZXT">NZXT</option>
                            <option value="Lian Li">Lian Li</option>
                        </select>
                    </div>
                    <div>
                        <select name="size" value={CaseFilters.size} onChange={handleSizeChange}>
                            <option value="">Choose a Size</option>
                            <option value="Full Tower">Full Tower</option>
                            <option value="Mid Tower">Mid Tower</option>
                            <option value="Mini Tower">Mini Tower</option>

                        </select>
                    </div>
                    <div>
                        <select name="includedFans" value={CaseFilters.includedFans} onChange={handleFanChange}>
                            <option value="">Choose Fan option</option>
                            <option value="Included Fans">Included Fans</option>
                            <option value="">No Fans</option>

                        </select>
                    </div>
                    <div>
                        <select name="rgb" value={CaseFilters.rgb} onChange={handleRGBChange}>
                            <option value="">Choose RGB option</option>
                            <option value="with RGB lighting">RGB Lighting</option>
                            <option value="no RGB">No RGB</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="information-box">
                <ProductSearch query={query} part="case" />
            </div>
        </div>
    )
}

const ShowFilters = ({ part }) => {


    if (part === "CPU") {


        return (
            CpuFiltering()
        )

    } else if (part === "GPU") {
        return (
            GPUFiltering()
        )

    } else if (part === "RAM") {
        return (
            RAMFiltering()
        )
    } else if (part === "cooler") {
        return (
            CoolerFiltering()
        )
    } else if (part === "PSU") {
        return (
            PowerFiltering()
        )
    } else if (part === "case") {
        return (
            CaseFiltering()
        )
    } else if (part === "Mother") {
        return (
            MotherFiltering()
        )
    }

}

export default ShowFilters;