import styles from "./styles.module.css"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import vectorRight from "../../images/vectorRight.png"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';
const icon = L.icon({ 
  iconRetinaUrl:iconRetina, 
  iconUrl: iconMarker, 
  shadowUrl: iconShadow 
});

const AdminShopProposalEdit = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [cities, setCities] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [searchStreets, setSearchStreets] = useState([]);
    const [selectedStreet, setSelectedStreet] = useState(null);
    

    const proposal = location.state?.proposal;
    const [name, setName] = useState(proposal.name);
    const [address, setAddress] = useState(proposal.address);
    const [position, setPosition] = useState([proposal.x_location,proposal.y_location])

    function LocationMarker() {
      const map = useMapEvents({
        click(e) {
          setPosition(e.latlng)
          map.flyTo(e.latlng, map.getZoom())
        },
      })
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
     const handleSubmit = () => {
        try {
          const response = axios.post("http://localhost:8080/api/admin/saveproposal", {
            id: proposal.id,
            name: name, 
            address: address, 
            x_location: position.lat, 
            y_location: position.lng,
            street_id: selectedStreet,
          })
          window.alert("Propozycja zatwierdzona pomyślnie")
          navigate('/admin/shopproposal')
        } catch (error) {
          if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message)
          }
        }
     }

    return (
    <div className={styles.shop_container}>
        <div className={styles.shop_container_2}>
            <p className={styles.title}>Zarządzaj propozycjami sklepów</p>
            {error && <p className={styles.error}>{error}</p>}
            <p className={styles.nag}>Nazwa sklepu:</p>
            <input className={styles.select_style} type="text" onChange={(e) => setName(e.target.value)} value={name}></input>
            <p className={styles.nag}>Adres:</p>
            <input className={styles.select_style} type="text" onChange={(e) => setAddress(e.target.value)} value={address}></input>
            <p>Możesz zmienić lokalizację naciskając nowe miejsce na mapie i potwierdzic przyciskiem 'Zmień lokalizację'</p>
            <MapContainer style={{height: '300px', width: '50%'}} center={position} zoom={16} className={styles.mapContainer}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={icon}>
                <Popup>
                  Pozycja sklepu
                </Popup>
              </Marker>
              <LocationMarker />
            </MapContainer>
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
            </div>
            )}
            {selectedStreet && (
              <button className={styles.green_btn} onClick={() => handleSubmit()}>Zatwierdź propozycję</button>
            )}
        </div>
    </div>
    )
}

export default AdminShopProposalEdit