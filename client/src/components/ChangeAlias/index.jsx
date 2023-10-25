import { useState } from "react"
import axios from "axios"
import { Link, useNavigate, useLocation } from "react-router-dom"
import styles from "./styles.module.css"

const ChangeAlias = () => {
    const location = useLocation();
    const id = location.state?.id
    
    const [alias, setAlias] = useState('')
    const [error, setError] = useState("")
    const navigate = useNavigate()
    
    const handleChangeAlias = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/api/users/changeAlias", {
                id: id,
                alias: alias
            });
            navigate("/userpanel")
        } catch (error) {
            console.error('Błąd podczas zmiany pseudonimu: ', error.response.data.message);
            if(error.response.data){
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_container_2}>
                <div className={styles.signup_title_container}>
                    <p className={styles.signup_title}>Zmień pseudonim</p>
                </div>
                <input type="text" placeholder="Nowy pseudonim" onChange={(e) => setAlias(e.target.value)}/>
                {error && <div className={styles.error_msg}>{error}</div>}
                <br/>
                <button onClick ={handleChangeAlias} className={styles.green_btn} >Zmień pseudonim</button>
            </div>
        </div>
    );
};
export default ChangeAlias