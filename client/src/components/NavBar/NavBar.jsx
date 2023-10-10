import React from "react";
import Image from "react";
import styles from "./styles.module.css"
import logo from "../../images/logo.png"
import mainPage from "../../images/mainPage.png"
import products from "../../images/products.png"
import shops from "../../images/shops.png"

const NavBar = () => {
  return (
    <div className={styles.container}>
        <img className = {styles.logo} src={logo}/>
        <div className={styles.menu}>
            <img className = {styles.icon} src={mainPage}/>
            <p className={styles.text}>Strona główna</p>
            <img className = {styles.icon} src={shops}/>
            <p className={styles.text}>Sklepy</p>
            <img className = {styles.icon} src={products}/>
            <p className={styles.text}>Produkty</p>
            <button className = {styles.login_button}>Zaloguj się</button>
        </div>
    </div>
  );
};
export default NavBar