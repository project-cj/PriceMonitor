import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from "axios";
import styles from "./styles.module.css";
import jwt from "jwt-decode";
import vectorRight from "../../images/vectorRight.png";
import bin from "../../images/bin.png";
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';
const icon = L.icon({ 
  iconRetinaUrl:iconRetina, 
  iconUrl: iconMarker, 
  shadowUrl: iconShadow 
});

const UserPanel = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("token");
  let decode = null;
  decode = jwt(user);
  const id = decode.id;
  const status = decode.status;

  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [radius, setRadius] = useState(0);
  const [position, setPosition] = useState(null)
  const [shopProposals, setShopProposals] = useState([]);

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  }
  
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/userpanel/${id}`);
      console.log('data',response.data);
      setRadius(response.data.radius);
      setSearchResults(response.data);
      setPosition([response.data.x_location, response.data.y_location])
      setLoading(false);
    } catch (error) {
      console.log(error)
      setError("Wystąpił błąd podczas pobierania danych.");
    }
  };
  const fetchShopProposals = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/admin/getproposals");
        setShopProposals(response.data);
    } catch (error) {
        setError("Wystąpił błąd podczas pobierania propozycji sklepów.");
    }
}
  useEffect(() => {
    fetchUserData();
    fetchShopProposals();
    console.log('res',searchResults)
  }, []);

  const navigateShoppingList = (id) => {
    navigate('/shoppinglist', {state: {id}})
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

  const handleChangeLocation = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post("http://localhost:8080/api/users/changeLocation", {
          id: id,
          x_loc: position.lat,
          y_loc: position.lng
        });
        console.log(radius)
        handleRefresh();
        window.alert("Pomyślnie zmieniono lokalizację");  
    } catch (error) {
        console.error('Błąd podczas zmiany lokalizacji: ', error.response.data.message);
        if(error.response.data){
          window.alert(error.response.data.message)
        }
    }
  }

  const navigateProduct = (item, item2) => {
    console.log("Pr ID:", item, "Sh ID:",item2)
    navigate('/product', {state: {item, item2}})
  }
  const navigateEdit = (proposal) => {
    navigate('/admin/shopproposal/edit', {state: {proposal}})
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
              {status === "ADMIN" ? (
                <div>
                  <p className={styles.userDetails}>E-mail: {searchResults.email}</p>
                  <p className={styles.userDetails}>Pseudonim: {searchResults.alias}</p>
                  <p className={styles.title}>Propozycje sklepów</p>
                  {shopProposals.length>0 && 
                    <div>
                      <table className={styles.searchResults}>
                        <thead>
                          <tr>
                            <th>Nazwa sklepu</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>Edycja</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shopProposals.map((proposal, index) => (
                            <tr key={index}>
                              <td>{proposal.name}</td>
                              <td>{proposal.x_location}</td>
                              <td>{proposal.y_location}</td>
                              <td className={styles.navigateButton}><img src={vectorRight} onClick={() => navigateEdit(proposal)} alt="x"></img></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  }
                </div>
              ) : (
                <div>
                  <p className={styles.userDetails}>E-mail: {searchResults.email}</p>
                  <p className={styles.userDetails}>Pseudonim: {searchResults.alias}</p>
                  <p className={styles.userDetails}>Promień wyszukiwania sklepów: {searchResults.radius} km</p>
                  <p className={styles.userDetails}>Podaj nowy promień</p>
                  <input className={styles.number_field} type="number" value={radius} onChange={(e) => setRadius(e.target.value)}/>
                  <button onClick ={handleChangeRadius} className={styles.green_btn} >Zmień promień</button><br/>
                  <button onClick={() =>navigateAlias(id)} className={styles.green_btn}>Zmień pseudonim</button>
                  <button onClick={() =>navigatePassword(id)} className={styles.green_btn}>Zmień hasło</button><br/>
                  <p className={styles.title}>Twoja lokalizacja</p>
                  <p>Możesz zmienić lokalizację naciskając nowe miejsce na mapie i potwierdzic przyciskiem 'Zmień lokalizację'</p>
                  <MapContainer style={{height: '300px', width: '50%'}} center={position} zoom={16} className={styles.mapContainer}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={icon}>
                      <Popup>
                        {searchResults.alias}
                      </Popup>
                    </Marker>
                    <LocationMarker />
                  </MapContainer>
                  <button onClick ={handleChangeLocation} className={styles.green_btn} >Zmień lokalizację</button><br/>
                  <p className={styles.title}>Twoje listy zakupów</p>
                  <table className={styles.searchResults}>
                    <thead>
                      <tr>
                        <th>Nazwa</th>
                        <th>Przybliżona cena</th>
                        <th>Usuń listę</th>
                        <th>Przejdź do listy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.shoppinglists.map((result, index) => (
                        <tr key={index}>
                          <td>{result.name}</td>
                          <td>{result.price}</td>
                          <td className={styles.navigateButton}><img src={bin} onClick={() =>handleDeleteList(result.id)} alt="x"></img></td>
                          <td className={styles.navigateButton}><img src={vectorRight} onClick={() =>navigateShoppingList(result.id)} alt="x"></img></td> 
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
                        <th>Usuń cenę</th>
                        <th>Przejdź do produktu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.price_reads.map((result, index) => (
                        <tr key={index}>
                          <td>{result.Shop_has_Product.Product.name}</td>
                          <td>{result.price}</td>
                          <td>{result.confirmation_number}</td>
                          <td>{result.rejected_number}</td>
                          <td className={styles.navigateButton}><img src={bin} onClick={() =>handleDelete(result.id)} alt="x"></img></td>
                          <td className={styles.navigateButton}><img src={vectorRight} onClick={() =>navigateProduct(result.Shop_has_Product.Product_id, result.Shop_has_Product.Shop_id)} alt="x"></img></td>  
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
            </div>
          }
        </div>
      </div>
    );
  }
};

export default UserPanel;