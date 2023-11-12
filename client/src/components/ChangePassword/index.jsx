import { useState } from "react"
import axios from "axios"
import { Link, useNavigate, useLocation } from "react-router-dom"
import styles from "./styles.module.css"

const ChangePassword = () => {
    const location = useLocation();
    const id = location.state?.id
    
    const [data, setData] = useState({id: id, oldPassword: "", newPassword: "", repPassword: "" })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    
    const handleChangePassword = async (e) => {
        e.preventDefault()
        try {
            const { data: res } = await axios.post("http://localhost:8080/api/users/changePassword", data)
            window.alert("Użytkownik pomyślnie zmienił hasło")
            navigate("/userpanel")
        } catch (error) {
            console.error('Błąd podczas zmiany hasła: ', error.response.data.message);
            if(error.response.data){
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_container_2}>
                <div className={styles.signup_title_container}>
                    <p className={styles.signup_title}>Zmień hasło</p>
                </div>
                <p className={styles.nag}>Obecne hasło</p>
                <input type="password" placeholder="Obecne hasło" name="oldPassword" onChange={handleChange} value={data.oldPassword} required className={styles.input}/>
                <p className={styles.nag}>Nowe hasło</p>
                <input type="password" placeholder="Nowe hasło" name="newPassword" onChange={handleChange} value={data.newPassword} required className={styles.input}/>
                <p className={styles.nag}>Powtórz nowe hasło</p>
                <input type="password" placeholder="Powtórz nowe hasło" name="repPassword" onChange={handleChange} value={data.repPassword} required className={styles.input}/>
                {error && <div className={styles.error_msg}>{error}</div>}
                <br/>
                <button onClick ={handleChangePassword} className={styles.green_btn} >Zmień hasło</button>
            </div>
        </div>
    );
};
export default ChangePassword