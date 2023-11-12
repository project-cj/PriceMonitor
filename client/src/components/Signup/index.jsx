import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import cart from "../../images/cart.png"
const Signup = () => {
    const [data, setData] = useState({
        email: "",
        alias:"",
        password: "",
        password_repeat: ""
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/users"
            const { data: res } = await axios.post(url, data)
            window.alert("Użytkownik został pomyślnie zarejestrowany")
            navigate("/login")
            console.log(res.message)
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }
    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_container_2}>
                <div className={styles.signup_title_container}>
                    <p className={styles.signup_title}>Zarejestruj się</p>
                </div>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <p>Email</p>
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className={styles.input} />
                    <p>Hasło</p>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required className={styles.input} />
                    <p>Powtórz hasło</p>
                    <input type="password" placeholder="Password" name="password_repeat" onChange={handleChange} value={data.password_repeat} required className={styles.input} />
                    <p>Pseudonim</p>
                    <input type="text" placeholder="Pseudonim" name="alias" onChange={handleChange} value={data.alias} required className={styles.input} />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.green_btn}>Zarejestruj się</button>
                </form>
                <img className = {styles.cart} src={cart} hidden></img>
            </div>
        </div>
    );
};
export default Signup