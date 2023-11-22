import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import jwt from "jwt-decode"
import vectorRight from "../../images/vectorRight.png"
import bin from "../../images/bin.png";

const ShoppingListsView = () => {
  const user = localStorage.getItem("token");
  let decode = null;
  decode = jwt(user);
  const User_id = decode.id;

  const navigate = useNavigate();

  const [shoppingLists, setShoppingLists] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product/`);
      console.log('products',response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setError("Wystąpił błąd podczas pobierania danych.");
    }
  };
  useEffect(() => {
    fetchProducts();
    console.log('res',products)
  }, []);

  const fetchLists = async () => {
    try {
      console.log("user id",User_id)
      const response = await axios.get(`http://localhost:8080/api/shoppingLists/${User_id}`);
      console.log('lists',response.data);
      setShoppingLists(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setError("Wystąpił błąd podczas pobierania danych.");
    }
  };
  useEffect(() => {
    fetchLists();
    console.log('res',shoppingLists)
  }, []);

  const navigateCreateList = (id) => {
    navigate('/create-list', {state: {id}})
  }

  const navigateShoppingList = (id) => {
    navigate('/shoppinglist', {state: {id}})
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDeleteList = async (resultId) => {
    const confirmDelete = window.confirm('Czy na pewno chcesz usunąć rekord?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/shoppingLists/${resultId}`);
        handleRefresh();
      } catch (error) {
        console.log("error",error)
        setError("Wystąpił błąd podczas pobierania danych.");
      }
      
    }
  };
  

 return (
    <div className={styles.container}>
      <div className={styles.container_2}>
        <p className={styles.title}>Listy zakupów</p>
        <button onClick={navigateCreateList} className={styles.green_btn}>Utwórz nową listę</button>
          <div>
          <table className={styles.searchResults}>
                <thead>
                  <tr>
                    <th>Nazwa</th>
                    <th>Usuń listę</th>
                    <th>Przejdź do listy</th>
                  </tr>
                </thead>
                <tbody>
                {shoppingLists.map((result, index) => (
                  <tr key={index}>
                    <td>{result.name}</td>
                    <td className={styles.navigateButton}><img src={bin} onClick={() =>handleDeleteList(result.id)} alt="x"></img></td>
                    <td className={styles.navigateButton}><img src={vectorRight} onClick={() =>navigateShoppingList(result.id)} alt="x"></img></td> 
                  </tr>
                ))}
                </tbody>
              </table>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListsView;
