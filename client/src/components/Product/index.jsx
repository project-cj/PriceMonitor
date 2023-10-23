import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";


const Product = () => {

  
  const location = useLocation();
  const product = location.state?.item

  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(true);

  
  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product/${product}`);
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
  }else{
    return (
      <div className={styles.shop_container}>
        <div className={styles.shop_container_2}>
          <p className={styles.title}>Strona produktu</p>
          {error && <p className={styles.error}>{error}</p>}
          {searchResults && 
            <div className={styles.shop_container_2}>
              <p>Marka: {searchResults.Brand.name}</p>
              <p>Produkt: {searchResults.name}</p>
              <p>Podkategoria: {searchResults.Subcategory.name}</p>
              <p>Kategoria: {searchResults.Subcategory.Category.name}</p>
              <table className={styles.searchResults}>
                <thead>
                  <tr>
                    <th>Sklep</th>
                    <th>Ulica</th>
                    <th>Cena</th>
                  </tr>
                </thead>
                <tbody>
                {searchResults.shop_has_products.map((result, index) => (
                  <tr key={index}>
                    <td>{result.Shop.name}</td>
                    <td>{result.Shop.address}</td>  
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

export default Product;