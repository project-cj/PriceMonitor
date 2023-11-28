import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import cart from "../../images/cart.png"
const PasswordResetChange = () => {
    const [data, setData] = useState({
        password: "",
        password_repeat: ""
    })
    const [canReset, setCanReset] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams)
    const [token, setToken] = useState("")
    const [id, setId] = useState(-1)
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    const handleSubmitChangePassword = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/passwordreset/change", {
                id: id,
                passwords: data
            })
            console.log(response.status)
            window.alert("Haslo zmienione pomyslnie")
            navigate('/login')
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                window.alert(error.response.data.message)
            }
        }
    }
    const handleCheckReset = async () => {
        try {
            console.log(id)
            console.log(token)
            const response = await axios.post("http://localhost:8080/api/passwordreset/check", {
                id: id,
                token: token
            })
            console.log(response)
            if(response.status==200)
                setCanReset(true)
            else
                setCanReset(false)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        if(searchParams){
            setId(searchParams.get('id'))
            setToken(searchParams.get('token'))
            handleCheckReset()
            console.log(canReset)
        }
    }, [id])
    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_container_2}>
                <div className={styles.signup_title_container}>
                    <p className={styles.signup_title}>Odzyskiwanie hasla</p>
                </div>
                {canReset ? (
                    <form className={styles.form_container}>
                        <p>Nowe hasło</p>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required className={styles.input} />
                        <p>Powtórz nowe hasło</p>
                        <input type="password" placeholder="Password" name="password_repeat" onChange={handleChange} value={data.password_repeat} required className={styles.input} />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="button" onClick={handleSubmitChangePassword} className={styles.green_btn}>Wyslij</button>
                    </form>
                ) : (
                    <p>Invalid token</p>
                )}
                <img className = {styles.cart} src={cart} hidden></img>
            </div>
        </div>
    );
};
export default PasswordResetChange