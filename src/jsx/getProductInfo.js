export async function fetchProductInfo(asin) {
    try {
      const response = await fetch(
        `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}&country=US`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "84b6167ba8mshc9988e1d597379bp14a64bjsnb548ea849fd2", 
            "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (err) {
      console.error("Error fetching product data:", err);
      throw err;
    }
  }