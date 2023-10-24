import React, { useState, useEffect, useLocation} from "react";
import { useNavigate } from "react-router-dom";
import {useDebounce} from "use-debounce"
import axios from "axios";
import styles from "./styles.module.css";
import vectorRight from "../../images/vectorRight.png"

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cities, setCities] = useState([]);
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [searchField, setSearchField] = useState("");
  const [foundProducts, setFoundProducts] = useState([]);
  const [debouncedSearchField] = useDebounce(searchField, 500);

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
        const response = await axios.get("http://localhost:8080/api/shop"); 
        setShops(response.data);
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania sklepów.");
      }
    };
    fetchShops();
  }, []); 

  useEffect(() => {
    if(searchField.length>0){
      try {
        handleSearchLike(searchField)
      } catch (error) {
        setError("Błąd wyszukiwania")
      }
    }
  }, [debouncedSearchField])

  const handleSearchLike = async (value) => {
    try {
      setSearchField(value)
      const response = await axios.get(`http://localhost:8080/api/products/search_like/${searchField}`)
      setFoundProducts(response.data)
      console.log(selectedProduct)
    } catch (error) {
    }
  }
  const handleSearchField = (val) => {
    setSearchField(val)
    const selectedOption = foundProducts.find(prod => prod.name === val)
    if(selectedOption){
      setSelectedProduct(selectedOption.id)
    } else {
      setSelectedProduct(null)
    }
  }
  const handleSearch = async () => {
    if (selectedCity && selectedProduct) {
      try {
        const response = await axios.post("http://localhost:8080/api/products/search", {
          city: selectedCity,
          product: selectedProduct
        })
        console.log("prods:", response.data)
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

  const navigateProduct = (item) => {
    navigate('/product', {state: {item}})
  }
  
  return (
    <div className={styles.product_container}>
        <div className={styles.product_container_2}>
      <p className={styles.title}>Wyszukaj produkt</p>
      {error && <p className={styles.error}>{error}</p>}
      <select className={styles.select_style} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="" selected hidden>Wybierz miasto</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      {/* <select className={styles.select_style} onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value="" selected hidden>Wybierz produkt</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select> */}
      <input type="text" className={styles.select_style} onChange={(e) => handleSearchField(e.target.value)} list="words"></input>
      <button onClick={handleSearch} className={styles.green_btn}>Szukaj</button><br/>
      {foundProducts.length > 0 && (
        <datalist id="words">
          {foundProducts.map((word, index) => (
            <option key={word.id} value={word.name}></option>
          ))}
        </datalist>
      )}
      {searchResults.length > 0 && (
        <div>
          <p className={styles.title}>Wyniki wyszukiwania</p>
          <table className={styles.searchResults}>
            <thead>
              <tr>
                <th>Nazwa sklepu</th>
                <th>Ulica</th>
                <th>Najniższa cena</th>
                <th>Najwyższa cena</th>
                <th>Przejdź do sklepu</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.shop_name}</td>
                  <td>{result.shop_address}</td>
                  <td>{result.min_price}</td>
                  <td>{result.max_price}</td>
                  <td className={styles.navigateButton}><img src={vectorRight} onClick={() =>navigateProduct(selectedProduct)} alt="x"></img></td>  
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