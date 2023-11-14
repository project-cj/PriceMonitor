import styles from "./styles.module.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import vectorRight from "../../images/vectorRight.png"
const AdminShopProposal = () => {
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [searchStreets, setSearchStreets] = useState([]);
    const [selectedStreet, setSelectedStreet] = useState(null);
    const [shopProposals, setShopProposals] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/cities");
            setCities(response.data);
          } catch (error) {
            setError("Wystąpił błąd podczas pobierania miast.");
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
        fetchCities();
        fetchShopProposals();
      }, []);
    
      const handleSearchStreet = async () => {
        if (selectedCity) {
            console.log(shopProposals);
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

      const navigateEdit = (proposal) => {
        navigate('/admin/shopproposal/edit', {state: {proposal}})
      }

    return (
    <div className={styles.shop_container}>
        <div className={styles.shop_container_2}>
            <p className={styles.title}>Zarządzaj propozycjami sklepów</p>
            {error && <p className={styles.error}>{error}</p>}
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
    </div>
    )
}

export default AdminShopProposal