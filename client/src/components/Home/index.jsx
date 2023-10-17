import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.home_container}>
      <div className={styles.home_container_2}>
        <h1>Cheaper shopping </h1>
        <h1>Better Living </h1>
        <div className={styles.home_p}>
        <p>Witaj na naszej stronie internetowej, która oferuje wiele unikalnych funkcji, które uczynią Twoje zakupy łatwiejszymi i bardziej wygodnymi.
            Oferujemy wyszukiwanie najniższej ceny, wyświetlamy ceny produktów w różnych sklepach, oferujemy dostęp do aplikacji sklepowych i wiele innych funkcji, które uczynią Twoje zakupy łatwiejszymi i bardziej wygodnymi.
        </p>
        </div>
        <div className={styles.buttons}>
          <button type = "submit" className={styles.green_btn}
            onClick={() => navigate("/signup")}>Zarejestruj się</button>
            <p className={styles.white_text} onClick={() => navigate('/product')}>Kontynuuj bez konta</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
