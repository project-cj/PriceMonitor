import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const Shop = () => {

  const location = useLocation();
  const shop = location.state?.item

  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/shop/${shop}`);
      console.log('data',response.data);
      setSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setError("Wystąpił błąd podczas pobierania danych.");
    }
  };
  useEffect(() => {
    fetchProductData();
    console.log('res',searchResults)
  }, []);

  if(isLoading){
    return (
      <div>
        Ładowanie szczegółów
      </div>
    )
  } else {
    return (
      <div className={styles.shop_container}>
        <div className={styles.shop_container_2}>
          <p className={styles.title}>Strona sklepu</p>
          {error && <p className={styles.error}>{error}</p>}
          {searchResults &&
            <div className={styles.shop_container_2}>
                <p>Nazwa: {searchResults.name}</p>
                <p>Ulica: {searchResults.address}</p>
                <p>Miasto: {searchResults.Street.City.name}</p>
                <table className={styles.searchResults}>
                  <thead>
                    <tr>
                      <th>Produkt</th>
                      <th>Marka</th>
                      <th>Przejdź</th>
                    </tr>
                  </thead>
                  <tbody>
                  {searchResults.shop_has_products.map((result, index) => (
                    <tr key={index}>
                      <td>{result.Product.name}</td>
                      <td>{result.Product.Brand.name}</td>  
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          }
        </div>
      </div>
    );
  }
};

export default Shop;