import React, { useState, useEffect, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import vectorRight from "../../images/vectorRight.png"

const ShopSearch = () => {
  const navigate = useNavigate();

  const [searchField, setSearchField] = useState("");
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);
  const [shops, setShops] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


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
        const response = await axios.get("http://localhost:8080/api/shops")
        setShops(response.data);
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania sklepow.");
      }
    };
    fetchShops();
  }, []);


  const handleSearch = async () => {
    if (selectedCity) {
      try {
        const response = await axios.post("http://localhost:8080/api/shops/search", {
          city: selectedCity
        })
        console.log("shops:", response.data)
        setSearchResults(response.data)
        setError(null)
      } catch (error) {
        setError("Błąd wyszukiwania")
        setSearchResults([])
      }
    } else {
      setSearchResults([]);
      console.log('not found anything!')
    }
  };



  const navigateShop = (item) => {
    navigate('/shop', {state: {item}})
  }
  
  return (
    <div className={styles.shop_container}>
      <div className={styles.shop_container_2}>
        <p className={styles.title}>Wyszukaj sklep</p>
        {error && <p className={styles.error}>{error}</p>}
        <select className={styles.select_style} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="" selected hidden>Wybierz miasto</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch} className={styles.green_btn}>Szukaj</button>
        {searchResults.length > 0 && (
          <div>
            <p className={styles.title}>Wyniki wyszukiwania</p>
            <table className={styles.searchResults}>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Ulica</th>
                  <th>Przejdź</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr key={result.id}>
                    <td>{result.name}</td>
                    <td>{result.address}</td>
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