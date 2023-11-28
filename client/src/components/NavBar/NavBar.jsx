import React from "react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode"
import Image from "react";
import styles from "./styles.module.css"
import logo from "../../images/logo.png"
import mainPage from "../../images/mainPage.png"
import products from "../../images/products.png"
import shops from "../../images/shops.png"
import logout from "../../images/logout.png"
import user from "../../images/user.png"
import addproduct from "../../images/addproduct.png"
import newshop from "../../images/newshop.png"
import shoppinglist from "../../images/shoppinglist.png"
import burger from "../../images/burger.png"
import userGreen from "../../images/userGreen.png"

const NavBar = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [decodedUser, setDecodedUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("token")
    if(user){
      setDecodedUser(jwt(user))
      console.log(decodedUser.alias)
      setIsUserLoggedIn(true);
    }else{
      setIsUserLoggedIn(false);
    }
      
  }, [])
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/home')
    window.location.reload()
  }
  return (
    <div className={styles.container}>
        <img className = {styles.logo} src={logo}/>
        <div className={styles.menu}>
          <div className={styles.redirect} onClick={()=>navigate("/userPanel")}>
            <img className = {styles.icon} src={mainPage} alt="userPanel"/>
            <p className={styles.text}>Strona główna</p>
          </div>
          <div className={styles.redirect} onClick={()=>navigate("/shopsearch")}>
            <img className = {styles.icon} src={shops} alt="shops"/>
            <p className={styles.text}>Sklepy</p>
          </div>
          <div className={styles.redirect} onClick={()=>navigate("/productsearch")}>
            <img className={styles.icon} src={products} alt="product"/>
            <p className={styles.text}>Produkty</p>
          </div>
          {isUserLoggedIn ? (
            decodedUser.status === "ADMIN" ? (
              <div>
                <div className={styles.userMenu} onClick={() => setMenuOpen(!menuOpen)}>{decodedUser.alias}<img className={styles.icon} src={userGreen}></img><img className={styles.icon} src={burger}></img></div>
                <div className={`${styles.dropdownMenu} ${menuOpen? styles.active : styles.inactive}`}>
                  <div className={styles.dropdownComponent} onClick ={() => navigate ('/userpanel')}>Konto administratora<img className={styles.iconSmall} src={user}></img></div>
                  <div className={styles.dropdownComponent} onClick ={() => navigate("/admin/shopproposal")}>Zatwierdź sklepy<img className={styles.iconSmall} src={addproduct}></img></div>
                  <div className={styles.dropdownComponent} onClick ={() => navigate("/admin/manageusers")}>Zarządzaj kontami<img className={styles.iconSmall} src={newshop}></img></div>
                  <div className={styles.dropdownComponent} onClick={() => handleLogout()}>Wyloguj<img className={styles.iconSmall} src={logout}></img></div>
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.userMenu} onClick={() => setMenuOpen(!menuOpen)}>{decodedUser.alias}<img className={styles.icon} src={userGreen}></img><img className={styles.icon} src={burger}></img></div>
                <div className={`${styles.dropdownMenu} ${menuOpen? styles.active : styles.inactive}`}>
                  <div className={styles.dropdownComponent} onClick ={() => navigate ('/userpanel')}>Konto użytkownika<img className={styles.iconSmall} src={user}></img></div>
                  <div className={styles.dropdownComponent} onClick ={() => navigate ('/productadd')}>Dodaj cenę produktu<img className={styles.iconSmall} src={addproduct}></img></div>
                  <div className={styles.dropdownComponent} onClick ={() => navigate ('/shopproposal')}>Zaproponuj nowy sklep<img className={styles.iconSmall} src={newshop}></img></div>
                  <div className={styles.dropdownComponent} onClick ={() => navigate ('/shoppinglists')}>Listy zakupów<img className={styles.iconSmall} src={shoppinglist}></img></div>
                  <div className={styles.dropdownComponent} onClick={() => handleLogout()}>Wyloguj<img className={styles.iconSmall} src={logout}></img></div>
                </div>
              </div>
            )
          ) : (
            <button className = {styles.login_button} onClick={() => navigate('/login')}>Zaloguj się</button>
          )}
            
        </div>
    </div>
  );
};
export default NavBar