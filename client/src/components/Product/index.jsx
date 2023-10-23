import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const Product = () => {

  const location = useLocation();
  const product = location.state?.item

  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product/${product}`);
      console.log(response.data)
      setSearchResults(response.data)
    } catch (error) {
      console.log(error)
      setError("Wystąpił błąd podczas pobierania miast.");
    }
  };
  useEffect(() => {
    fetchProductData();
    console.log(searchResults)
  }, []);

  return (
    <div className={styles.shop_container}>
      <div className={styles.shop_container_2}>
        <p className={styles.title}>Strona produktu</p>
        {error && <p className={styles.error}>{error}</p>}
        {searchResults && 
          <div>
            <p className={styles.title}>Wyniki wyszukiwania</p>
            <table className={styles.searchResults}>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>kod</th>
                  <th>id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{searchResults.name}</td>
                  <td>{searchResults.code}</td>
                  <td>{searchResults.Brand_id}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default Product;