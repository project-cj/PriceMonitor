import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import vectorRight from "../../images/vectorRight.png"
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';
const icon = L.icon({ 
  iconRetinaUrl:iconRetina, 
  iconUrl: iconMarker, 
  shadowUrl: iconShadow 
});

const Shop = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const shop = location.state?.item

  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [position, setPosition] = useState(null)

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/shop/${shop}`);
      console.log('data',response.data);
      setSearchResults(response.data);
      setPosition([response.data[0].shop_x, response.data[0].shop_y])
      setLoading(false);
    } catch (error) {
      console.log(error)
      setError("Wystąpił błąd podczas pobierania danych.");
    }
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  const navigateProduct = (item, item2) => {
    navigate('/product', {state: {item, item2}})
  }

  if(isLoading){
    return (
      <div>
        Ładowanie szczegółów
      </div>
    )
  } else {
    return (
      <div className={styles.shop_container}>
        <div className={styles.shop_container_2}>
          <p className={styles.title}>Strona sklepu</p>
          {error && <p className={styles.error}>{error}</p>}
          {searchResults.length>0 &&
            <div className={styles.shop_container_2}>
                <p>Nazwa: {searchResults[0].shop_name}</p>
                <p>Ulica: {searchResults[0].shop_address}</p>
                <p>Miasto: {searchResults[0].city_name}</p>

                <MapContainer style={{height: '300px', width: '50%'}} center={position} zoom={16} className={styles.mapContainer}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} icon={icon}>
                    <Popup>
                      {searchResults[0].shop_name}
                    </Popup>
                  </Marker>
                </MapContainer>
                <table className={styles.searchResults}>
                  <thead>
                    <tr>
                      <th>Produkt</th>
                      <th>Marka</th>
                      <th>Najniższa cena</th>
                      <th>Najwyższa cena</th>
                      <th>Przejdź do produktu</th>
                    </tr>
                  </thead>
                  <tbody>
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.product_name}</td>
                      <td>{result.brand_name}</td>
                      <td>{result.min_price}</td>
                      <td>{result.max_price}</td>
                      <td className={styles.navigateButton}><img src={vectorRight} onClick={() =>navigateProduct(result.product_id, result.shop_id)} alt="x"></img></td> 
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

export default Shop;