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

        </div>
    )
}

export default Main