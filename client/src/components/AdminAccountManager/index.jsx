import styles from "./styles.module.css"
import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
const AdminAccountManager = () => {
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
            <p>adminaccountmanager</p>
        </div>
    )
}

export default AdminAccountManager