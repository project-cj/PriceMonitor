import styles from "./styles.module.css"
import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
const Main = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/')
        window.location.reload()
    }
    const handleMain = () => {
        navigate('/')
    }
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Rezerwacja pokoi</h1>
                <div className = {styles.buttons_container}>
                    <button className={styles.white_btn} onClick = {handleMain}>Strona główna</button>
                    <button className={styles.white_btn} onClick={handleLogout}> Wyloguj </button>
                </div>
            </nav>
            <div className={styles.main}>
                
            </div>
        </div>
    )
}

export default Main