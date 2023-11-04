import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import cart from "../../images/cart.png"
const PasswordReset = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(window.location.search);
    const handleSubmit = async (e) => {
        try {
            const response = await axios.post("http://localhost:8080/api/passwordreset", {
                email: email
            })
        } catch (error) {
            setError(error)
            console.log(error)
        } 
    }
    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_container_2}>
                <div className={styles.signup_title_container}>
                    <p className={styles.signup_title}>Odzyskiwanie hasla</p>
                </div>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                    <p>Email</p>
                    <input type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} 
                    value={email} required className={styles.input} />
                    <p>Na adres wyslemy Ci wiadomosć z nowym haslem</p>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.green_btn}>Wyslij</button>
                    </form>
                <img className = {styles.cart} src={cart} hidden></img>
            </div>
        </div>
    );
};
export default PasswordReset