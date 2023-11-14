import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import thumbUp from "../../images/thumb_up.png"
import thumbDown from "../../images/thumb_down.png"
import jwt from "jwt-decode"
import bin from "../../images/bin.png";

const Product = () => {
  const user = localStorage.getItem("token");
  let decode = null;
  decode = jwt(user);
  const User_id = decode.id;

  const location = useLocation();
  const product = location.state?.item
  const shopId = location.state?.item2

  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(true);

  
  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product/${product}/${shopId}`);
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

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDelete = async (resultId) => {
    const confirmDelete = window.confirm('Czy na pewno chcesz usunąć rekord?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/product/${resultId}`);
        handleRefresh();
      } catch (error) {
        console.log("error",error)
        setError("Wystąpił błąd podczas pobierania danych.");
      }
      
    }
  };

  const handleConfirm = async (resultId) => {
    const confirmPrice = window.confirm('Czy na pewno chcesz potwierdzić cenę?');
    if (confirmPrice) {
      try {
        const response = await axios.post(`http://localhost:8080/api/product/confirm`, {
          id: resultId
        });
        handleRefresh();
      } catch (error) {
        console.log("error",error)
        setError("Wystąpił błąd podczas potwierdzania ceny.");
      }
      
    }
  };
  
  const handleReject = async (resultId) => {
    const rejectPrice = window.confirm('Czy na pewno chcesz odrzucić cenę?');
    if (rejectPrice) {
      try {
        const response = await axios.post(`http://localhost:8080/api/product/reject`, {
          id: resultId
        });
        handleRefresh();
      } catch (error) {
        console.log("error",error)
        setError("Wystąpił błąd podczas potwierdzania ceny.");
      }
      
    }
  };
  
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
          <p className={styles.title}>Produkt w sklepie</p>
          {error && <p className={styles.error}>{error}</p>}
          {searchResults && 
            <div className={styles.shop_container_2}>
              <p>Marka: {searchResults.Brand.name}</p>
              <p>Produkt: {searchResults.name}</p>
              <p>Podkategoria: {searchResults.Subcategory.name}</p>
              <p>Kategoria: {searchResults.Subcategory.Category.name}</p>
              <p>Sklep: {searchResults.shop_has_products[0].Shop.name}, {searchResults.shop_has_products[0].Shop.address}, {searchResults.shop_has_products[0].Shop.Street.City.name}</p>
              <table className={styles.searchResults}>
                <thead>
                  <tr>
                    <th>Cena</th>
                    <th>Potwierdzenia</th>
                    <th>Odrzucenia</th>
                    <th>Data początku</th>
                    <th>Data końca</th>
                    <th>Dodał</th>
                    <th>Potwierdź</th>
                    <th>Odrzuć</th>
                    <th>Usuń</th>
                  </tr>
                </thead>
                <tbody>
                {searchResults.shop_has_products[0].price_reads.map((result, index) => (
                  <tr key={index}>
                    <td>{result.price}</td>
                    <td>{result.confirmation_number}</td>
                    <td>{result.rejected_number}</td>
                    <td>{result.date_from}</td>
                    <td>{result.date_to}</td>
                    <td>{result.User.alias}</td>
                    <td className={styles.navigateButton}><img src={thumbUp} onClick={() =>handleConfirm(result.id)} alt="x"></img></td>
                    <td className={styles.navigateButton}><img src={thumbDown} onClick={() =>handleReject(result.id)} alt="x"></img></td>
                    {result.User.id === User_id &&
                      <td className={styles.navigateButton}><img src={bin} onClick={() =>handleDelete(result.id)} alt="x"></img></td>
                    }
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