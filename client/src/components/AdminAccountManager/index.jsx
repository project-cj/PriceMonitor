import styles from "./styles.module.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import vectorRight from "../../images/vectorRight.png"
const AdminAccountManager = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/admin/getusers");
            setUsers(response.data);
          } catch (error) {
            setError("Wystąpił błąd podczas pobierania użytkowników.");
          }
        };
        fetchUsers();
      }, []);
      const deleteUser = async (user) => {
        try {
            let response = null
            if(window.confirm(`Czy na pewno chcesz usunąć użytkownika o ID=${user.id}?`)){
                response = await axios.post("http://localhost:8080/api/admin/deleteuser", {
                    userID: user.id
                })
                if(response.status == 200)
                    window.alert("Konto usunięte")
            }
                
        } catch (error) {
            console.log(error)
            setError("Wystąpił błąd podczas usuwania użytkownika.");
        }
      }
    return (
        <div className={styles.shop_container}>
            <div className={styles.shop_container_2}>
                <p className={styles.title}>Zarządzaj użytkownikami</p>
                {error && <p className={styles.error}>{error}</p>}
                {users.length>0 &&
                    <div>
                        <table className={styles.searchResults}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Alias</th>
                                    <th>Status</th>
                                    <th>Usuń konto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.alias}</td>
                                    <td>{user.status}</td>
                                    <td className={styles.navigateButton}><img src={vectorRight} onClick={() => deleteUser(user)} alt="x"></img></td>
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

export default AdminAccountManager