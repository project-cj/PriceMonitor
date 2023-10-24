import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";

const ShoppingListsView = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedListId, setSelectedListId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedListProducts, setSelectedListProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    
    axios.get('http://localhost:8080/api/shoppingLists', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      setShoppingLists(response.data);
    });

   
    axios.get('http://localhost:8080/api/products') 
    .then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleAddProduct = () => {
    if (!selectedListId || !selectedProductId) {
      alert('Wybierz listę zakupów i produkt.');
      return;
    }

    axios.post('http://localhost:8080/api/shoppingLists/add-product', {
      shoppingListId: selectedListId,
      productId: selectedProductId,
    })
    .then((response) => {
      
      console.log('Produkt zostal dodany do listy:', response.data);
    })
    .catch((error) => {
      
      console.error('Bład dodania produktu do listy:', error);
    });
  };

  const handleSelectList = (listId) => {
    
    axios.get(`http://localhost:8080/api/shoppingLists/shopping-list/${listId}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    .then((response) => {
      setSelectedListProducts(response.data.products);
    })
    .catch((error) => {
      console.error('Błąd podczas pobierania produktów dla wybranej listy zakupów:', error);
    });
  };

 return (
    <div className={styles.container}>
      <div className={styles.container_2}>
        <p className={styles.title}>Lista zakupów</p>
        <select
          value={selectedListId}
          onChange={(e) => setSelectedListId(e.target.value)}
        >
          <option value="">Wybierz listę zakupów</option>
          {shoppingLists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>

        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="">Wybierz produkt</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddProduct} className={styles.green_btn}>Dodaj produkt</button>
        <Link to="/create-list" className={styles.white_btn}>Utwórz nową listę</Link>
        
      </div>
    </div>
  );
};

export default ShoppingListsView;
