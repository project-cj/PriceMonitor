import React, { useState, useEffect, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import vectorRight from "../../images/vectorRight.png"

const ShopSearch = () => {
  const navigate = useNavigate();

  const [searchField, setSearchField] = useState("");
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    console.log("searching")
  };

  const navigateShop = (item) => {
    navigate('/shop', {state: {item}})
  }
  
  return (
    <div className={styles.shop_container}>
      <div className={styles.shop_container_2}>
        <p className={styles.title}>Wyszukaj sklep</p>
        {error && <p className={styles.error}>{error}</p>}
        <input className={styles.search_field} type="text" onChange={(e) => setSearchField(e.target.value)}></input>
        <button onClick={handleSearch} className={styles.green_btn}>Szukaj</button>
        {searchResults.length > 0 && (
          <div>
            <p className={styles.title}>Wyniki wyszukiwania</p>
            <table className={styles.searchResults}>
              <thead>
                <tr>
                  <th>tbf</th>
                  <th>Sklep</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr key={result.id}>
                    <td>{result.name}</td>
                    <td className={styles.navigateButton}><img src={vectorRight} alt="x" onClick={() =>navigateShop(result.id)}></img></td> 
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

export default ShopSearch;