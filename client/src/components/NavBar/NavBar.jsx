import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "react";
import styles from "./styles.module.css"
import logo from "../../images/logo.png"
import mainPage from "../../images/mainPage.png"
import products from "../../images/products.png"
import shops from "../../images/shops.png"

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
        <img className = {styles.logo} src={logo}/>
        <div className={styles.menu}>
            <img className = {styles.icon} src={mainPage} onClick={() => navigate("/home")}/>
            <p className={styles.text} onClick={() => navigate("/home")}>Strona główna</p>
           
            <img className = {styles.icon} src={shops}/>
            <p className={styles.text}>Sklepy</p>
           
            <img className={styles.icon} src={products} onClick={() => navigate("/product")} />
            <p className={styles.text} onClick={() => navigate("/product")}>Produkty</p>


            <button className = {styles.login_button} onClick={() => navigate('/login')}>Zaloguj się</button>
        </div>
    </div>
  );
};
export default NavBar