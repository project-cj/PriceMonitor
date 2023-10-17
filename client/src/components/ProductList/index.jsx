import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cities, setCities] = useState([]);
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products")
        setProducts(response.data);
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania produktów.");
      }
    };
    fetchProducts();
  }, [selectedCity]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/cities");
        setCities(response.data);
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania miast.");
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/shops"); 
        setShops(response.data);
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania sklepów.");
      }
    };
    fetchShops();
  }, []); 


  const handleSearch = () => {
    if (selectedCity && selectedProduct) {
    
    // console.log('city and product selected')
    // const results = products.filter((product) => {
    //   // selectedCity to ID miasta, a selectedProduct to ID produktu
    //   return shops.some((shop) => {
    //     return shop.shopHasAProducts.some((shopHasAProduct) => {
    //       return (
    //         shopHasAProduct.productId === selectedProduct &&
    //         shop.cityId === selectedCity
    //       );
    //     });
    //   });
    // });

    //console.log("Search Results:", results); 
    //setSearchResults(results);
    } else {
      setSearchResults([]);
      console.log('not found anything!')
      console.log(selectedCity)
      console.log(selectedProduct)
      console.log(shops)
      console.log(products)
      console.log(cities)
    }
  };
  
  return (
    <div className={styles.product_container}>
        <div className={styles.product_container_2}>
      <h2>Wyszukaj produkt</h2>
      {error && <p>{error}</p>}
      <select className={styles.select_style} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="" selected hidden>Wybierz miasto</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <select className={styles.select_style} onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value="" selected hidden>Wybierz produkt</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <button onClick={handleSearch} className={styles.green_btn}>Szukaj</button>
      {searchResults.length > 0 && (
        <div>
          <h3>Wyniki wyszukiwania:</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nazwa</th>
                <th>Kod</th>
                <th>ID Marki</th>
                <th>ID Podkategorii</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.name}</td>
                  <td>{result.code}</td>
                  <td>{result.Brand_id}</td>
                  <td>{result.Subcategory_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProductList;