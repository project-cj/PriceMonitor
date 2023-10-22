import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const Shop = () => {

  const location = useLocation();
  const shop = location.state?.item

  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  
  return (
    <div className={styles.shop_container}>
      <div className={styles.shop_container_2}>
        <p className={styles.title}>Strona sklepu</p>
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

export default Shop;