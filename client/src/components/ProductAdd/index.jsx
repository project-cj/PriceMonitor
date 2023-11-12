import React, { useState, useEffect} from "react";
import { useNavigate, useLocation} from "react-router-dom";
import {useDebounce} from "use-debounce"
import axios from "axios";
import styles from "./styles.module.css";
import jwt from "jwt-decode"

const ProductAdd= () => {
  const user = localStorage.getItem("token")
  let decode = null
  decode = jwt(user)
  const id = decode.id;
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);
  const [shops, setShops] = useState([]);
  const [searchShops, setSearchShops] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchStreets, setSearchStreets] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [price, setPrice] = useState(0);
  
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
  const [startDate, setStartDate] = useState(today);
  
  const [endDate, setEndDate] = useState(null);
  const [foundProducts, setFoundProducts] = useState([]);
  const [debouncedSearchField] = useDebounce(searchField, 500);
  


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

  const handleSearchStreet = async () => {
    if (selectedCity) {
      try {
        const response = await axios.post("http://localhost:8080/api/cities/searchStreet", {
          city: selectedCity
        })
        console.log("streets:", response.data)
        setSearchStreets(response.data)
        setError(null)
      } catch (error) {
        setError("Błąd wyszukiwania")
        setSearchStreets([])
      }
    } else {
      setSearchStreets([]);
      console.log('not found anything!')
    }
  };


  const handleSearchShops = async () => {
    if (selectedStreet) {
      try {
        const response = await axios.post("http://localhost:8080/api/shops/searchInStreet", {
          street: selectedStreet
        })
        console.log("shops:", response.data)
        setSearchShops(response.data)
        setError(null)
      } catch (error) {
        setError("Błąd wyszukiwania")
        setSearchShops([])
      }
    } else {
      setSearchShops([]);
      console.log('not found anything!')
    }
  };

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

  
  const navigateProduct = (item, item2) => {
    navigate('/product', {state: {item, item2}})
  }
  

  const handleSubmit = async (e) => {
    try{
      const response = await axios.post("http://localhost:8080/api/product/add", {
        shop: selectedShop,
        product: selectedProduct,
        price: price,
        startDate: startDate,
        endDate: endDate,
        id: id
      })
      navigateProduct(selectedProduct, selectedShop);
    } catch (error) {
    }
  }
  
  return (
    <div className={styles.shop_container}>
      <div className={styles.shop_container_2}>
        <p className={styles.title}>Dodaj cenę produktu</p>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.nag}>Wybierz miasto</p>
        <select className={styles.select_style} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="" selected hidden>Wybierz miasto</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearchStreet} className={styles.green_btn}>Szukaj ulic</button>
        {searchStreets.length > 0 && (
          <div>
           <p className={styles.nag}>Wybierz ulicę</p>
            <select className={styles.select_style} onChange={(e) => setSelectedStreet(e.target.value)}>
              <option value="" selected hidden>Wybierz ulicę</option>
              {searchStreets.map((street) => (
                <option key={street.id} value={street.id}>
                  {street.name}
                </option>
              ))}
            </select>
        <button onClick={handleSearchShops} className={styles.green_btn}>Szukaj sklepów</button>
        </div>
        )}
        {searchShops.length > 0 && (
          <div>
           <p className={styles.nag}>Podaj sklep (jeśli nie możesz znaleźć swojego sklepu <text className={styles.blue_text} onClick={() => navigate('/shopproposal')}> zaproponuj go!</text>)</p>
            <select className={styles.select_style} onChange={(e) => setSelectedShop(e.target.value)}>
              <option value="" selected hidden>Wybierz sklep</option>
              {searchShops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name} - {shop.address}
                </option>
              ))}
            </select>
        </div>
        )}
        {searchShops.length > 0 && (
          <div>
             <p className={styles.nag}>Wpisz nazwę produktu</p>
            <input type="text" className={styles.select_style} onChange={(e) => handleSearchField(e.target.value)} list="words"></input>
            {foundProducts.length > 0 && (
              <datalist id="words">
                {foundProducts.map((word, index) => (
                  <option key={word.id} value={word.name}></option>
                ))}
              </datalist>
            )}

            <p className={styles.nag}>Podaj cenę produktu</p>
            <input className={styles.select_style} type="number" onChange={(e) => setPrice(e.target.value)}/>
            <p className={styles.nag}>Podaj datę rozpoczęcia promocji</p>
            <input className={styles.select_style} type="date" onChange={(e) => setStartDate(e.target.value)}/>
            <p className={styles.nag}>Podaj datę zakończenia promocji(pole nie jest wymagane)</p>
            <input className={styles.select_style} type="date" onChange={(e) => setEndDate(e.target.value)}/>
            <button onClick={handleSubmit} className={styles.green_btn}>Dodaj cenę</button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ProductAdd;