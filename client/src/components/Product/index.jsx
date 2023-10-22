import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const Product = () => {

  const location = useLocation();
  const product = location.state?.item

  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${product}`);
        console.log(response.data)
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania miast.");
      }
    };
    fetchProductData();
  }, []);

  return (
    <div className={styles.shop_container}>
      <div className={styles.shop_container_2}>
        <p className={styles.title}>Strona produktu</p>
        {error && <p className={styles.error}>{error}</p>}
        {searchResults.length > 0 && (
          <div>
            <p className={styles.title}>Wyniki wyszukiwania</p>
            <table className={styles.searchResults}>
              <thead>
                <tr>
                  <th>tbf</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr key={result.id}>
                    <td>{result.name}</td>
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

export default Product;