import React, { useState, useEffect, useLocation } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';
const icon = L.icon({ 
  iconRetinaUrl:iconRetina, 
  iconUrl: iconMarker, 
  shadowUrl: iconShadow 
});

const ShopProposal = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [shopName, setShopName] = useState("");
  const [pointLat, setPointLat] = useState(51.2398313);
  const [pointLng, setPointLng] = useState(22.520);
  const [position, setPosition] = useState(null)

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

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

  const handleSubmit = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/shopproposal", {
          lat: position.lat,
          lng: position.lng,
          name: shopName
        })
        if(response.status == 200)
          window.alert("Sklep zaproponowany!")
      } catch (error) {
        window.alert("Podaj nazwę sklepu aby dodać propozycję")
      }
  };

  
  return (
    <div className={styles.shop_container}>
      <div className={styles.shop_container_2}>
        <p className={styles.title}>Zaproponuj nowy sklep</p>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.nag}>Podaj nazwę sklepu</p>
        <input className={styles.select_style} type="text" placeholder="Nazwa sklepu" onChange={(e) => setShopName(e.target.value)}></input>
        <p className={styles.nag}>Wybierz lokalizację sklepu</p>
        <MapContainer style={{height: '300px', width: '50%'}} center={[pointLat, pointLng]} zoom={13} className={styles.mapContainer}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
        <button onClick={handleSubmit} className={styles.green_btn}>Wyslij propozycję</button>
      </div>
    </div>
  );
};

export default ShopProposal;