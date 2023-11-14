import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import jwt from "jwt-decode";
import vectorRight from "../../images/vectorRight.png";

const UserPanel = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("token");
  let decode = null;
  decode = jwt(user);
  const id = decode.id;

  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [radius, setRadius] = useState(0);
  
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/userpanel/${id}`);
      console.log('data',response.data);
      setRadius(response.data.radius);
      setSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setError("Wystąpił błąd podczas pobierania danych.");
    }
  };
  useEffect(() => {
    fetchUserData();
    console.log('res',searchResults)
  }, []);

  const navigateLists = () => {
    navigate('/shoppinglist')
  }

  const navigateAlias = (id) => {
    navigate('/changeAlias', {state: {id}})
  }
  
  const navigatePassword = (id) => {
    navigate('/changePassword', {state: {id}})
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleChangeRadius = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post("http://localhost:8080/api/users/changeRadius", {
          id: id,    
          radius: radius
        });
        console.log(radius)
        handleRefresh();
        window.alert("Pomyślnie zmieniono promień");
        
    } catch (error) {
        console.error('Błąd podczas zmiany promienia: ', error.response.data.message);
        if(error.response.data){
          window.alert(error.response.data.message)
        }
    }
  }

  

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
          <p className={styles.title}>Panel użytkownika</p>
          {error && <p className={styles.error}>{error}</p>}
          {searchResults && 
            <div className={styles.shop_container_2}>
              <p className={styles.userDetails}>E-mail: {searchResults.email}</p>
              <p className={styles.userDetails}>Alias: {searchResults.alias}</p>
              <p className={styles.userDetails}>Promień wyszukiwania sklepów: {searchResults.radius} km</p>
              <p className={styles.userDetails}>Podaj nowy promień</p>
              <input className={styles.number_field} type="number" value={radius} onChange={(e) => setRadius(e.target.value)}/>
              <button onClick ={handleChangeRadius} className={styles.green_btn} >Zmień promień</button><br/>
              <button onClick={() =>navigateAlias(id)} className={styles.green_btn}>Zmień pseudonim</button>
              <button onClick={() =>navigatePassword(id)} className={styles.green_btn}>Zmień hasło</button><br/>
              <p className={styles.title}>Twoje listy zakupów</p>
              <table className={styles.searchResults}>
                <thead>
                  <tr>
                    <th>Nazwa</th>
                    <th>Przybliżona cena</th>
                    <th>Przejdź do list</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.shoppinglists.map((result, index) => (
                    <tr key={index}>
                      <td>{result.name}</td>
                      <td>{result.price}</td>
                      <td className={styles.navigateButton}><img src={vectorRight} onClick={() =>navigateLists()} alt="x"></img></td> 
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={styles.title}>Twoje dodane ceny produktów</p>
              <table className={styles.searchResults}>
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th>Cena</th>
                    <th>Potwierdzenia</th>
                    <th>Odrzucenia</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.price_reads.map((result, index) => (
                    <tr key={index}>
                      <td>{result.Shop_has_Product.Product.name}</td>
                      <td>{result.price}</td>
                      <td>{result.confirmation_number}</td>
                      <td>{result.rejected_number}</td>
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

export default UserPanel;