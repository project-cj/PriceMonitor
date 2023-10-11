import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import cart from "../../images/cart.png"

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/auth"
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            window.location = "/"
        } catch (error) {
            if (error.response &&error.response.status >= 400 &&error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }
    return (
        <div className={styles.login_container}>
            <div className={styles.login_container_2}>
                <div className={styles.login_title_container}>
                    <p className={styles.login_title}>Zaloguj się</p>
                </div>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <p>Email</p>
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className={styles.input} />
                    <p>Hasło</p>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required className={styles.input} />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.green_btn}>Zaloguj się</button>
                </form>
                <div className={styles.register}>
                    <p>Nie masz konta? <text className={styles.blue_text} onClick={() => navigate('/signup')}>Zarejestruj się</text></p>
                    <p>Zapomniałeś hasła? <text className={styles.blue_text}>Odzyskaj hasło</text></p>
                </div>
                <img className = {styles.cart} src={cart} hidden></img>
            </div>
        </div>
    )
}
export default Login;
