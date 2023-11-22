import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import jwt from "jwt-decode"
import bin from "../../images/bin.png";

const ShoppingList = () => {
  const user = localStorage.getItem("token");
  let decode = null;
  decode = jwt(user);
  const User_id = decode.id;

  const location = useLocation();
  const List_id = location.state?.id;

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [shoppingListProducts, setShoppingListProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shopData, setShopData] = useState([]);
  
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

  const fetchListProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/shoppingLists/${List_id}/products`);
      console.log("listy: ", response.data)
      setShoppingListProducts(response.data);
    } catch (error) {
      console.log(error)
      setError("Wystąpił błąd podczas pobierania danych.");
    }
  };
  useEffect(() => {
    fetchListProducts();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (!selectedProductId) {
      alert('Wybierz produkt.');
      return;
    }
    try {
        const response = await axios.post('http://localhost:8080/api/shoppingLists/add-product', {
          shoppingListId: List_id,
          productId: selectedProductId,
        })
        console.log(response.data);
        window.alert("Produkt został dodany do listy");
        handleRefresh();
        
    } catch (error) {
        console.error('Błąd podczas dodania produktu: ', error.response.data.message);
        if(error.response.data){
          window.alert("Produkt jest już na liście");
          handleRefresh();
        }
    }
  }
  
  const handleGetPrice= async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/api/shoppingLists/listPrice", {
        shoppingListId: List_id, 
        userId: User_id
      })
      console.log("resp",response.data)
      if(Object.keys(response.data).length === 0 && response.data.constructor === Object){
        alert("Nie udało się obliczyć ceny najtańszej listy")
        setLoading(false);
      }else {
        const shopIdsWithPrices = new Map(Object.entries(response.data));
      
        const requests = [];
        for(const [key,value] of shopIdsWithPrices){
          try{
            const response = await axios.get(`http://localhost:8080/api/shop/shop/${key}`);
            const shopInfo = response.data;
            shopInfo.price = value;
            requests.push(shopInfo);
          }catch (error){
            console.error("Błąd przy wczytywaniu sklepów");
          }
        }
        const fetchedShopData = await Promise.all(requests);
        const filteredShopData = fetchedShopData.filter(Boolean);
        const sortedShopData = filteredShopData.sort((a,b) => a.price - b.price);
        setShopData(sortedShopData);
        console.log("posortowane:",sortedShopData);
        setLoading(false);
        setError(null);
      }
      
    }catch (error) {
      setError("Błąd wyliczania ceny produktu")
      alert("Nie udało się obliczyć ceny najtańszej listy")
      setLoading(false);
    }
};

const handleDeleteProduct = async (resultId) => {
  const confirmDelete = window.confirm('Czy na pewno chcesz usunąć produkt?');
  if (confirmDelete) {
    try {
      const response = await axios.delete(`http://localhost:8080/api/shoppingLists/product/${List_id}/${resultId}`);
      handleRefresh();
    } catch (error) {
      console.log("error",error)
      setError("Wystąpił błąd podczas pobierania danych.");
    }
    
  }
};


const [firstShop, ...restShops] = shopData;


  

 return (
    <div className={styles.container}>
      <div className={styles.container_2}>
        <p className={styles.title}>Lista zakupów</p>
          <div>
          <p>Dodaj produkt do listy</p>
          <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
            <option value="">Wybierz produkt</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddProduct} className={styles.green_btn}>Dodaj produkt</button>
            <table className={styles.searchResults}>
              <thead>
                <tr>
                  <th>Nazwa produktu</th>
                  <th>Marka</th>
                  <th>Usuń produkt</th>
                </tr>
              </thead>
              <tbody>
                {shoppingListProducts.map((result, index) => (
                  <tr key={index}>
                    <td>{result.Product.name}</td>
                    <td>{result.Product.Brand.name}</td>
                    <td className={styles.navigateButton}><img src={bin} onClick={() =>handleDeleteProduct(result.Product.id)} alt="x"></img></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleGetPrice} className={styles.green_btn} disabled={isLoading}>
              {isLoading ? 'Obliczanie...' : 'Oblicz cenę'}
            </button>
            {firstShop && (
              <div>
                <p className={styles.title}>Sklep z najniższą ceną za listę</p>
                <table className={styles.searchResults}>
                  <thead>
                    <tr>
                      <th>Nazwa sklepu</th>
                      <th>Adres</th>
                      <th>Cena listy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={firstShop.id}>
                      <td>{firstShop.name}</td>
                      <td>{firstShop.address}</td>
                      <td>{firstShop.price.toFixed(2)}</td> 
                    </tr>
                  </tbody>
                </table>
            </div>
            )}
            {restShops.length > 0 && (
              <div>
                <p className={styles.title}>Pozostałe sklepy w pobliżu</p>
                <table className={styles.searchResults}>
                  <thead>
                    <tr>
                      <th>Nazwa sklepu</th>
                      <th>Adres</th>
                      <th>Cena listy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restShops.map((result, index) => (
                      <tr key={index}>
                        <td>{result.name}</td>
                        <td>{result.address}</td>
                        <td>{result.price.toFixed(2)}</td> 
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
