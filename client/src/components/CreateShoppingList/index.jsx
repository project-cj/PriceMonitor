import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const CreateShoppingList = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleCreateList = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/api/shoppingLists/create-list", {
            name: name,
            User_id: token,
          });
          
      setName('');
      navigate('/shoppinglists')
    } catch (error) {
      console.error('Błąd podczas tworzenia listy zakupów:', error);
    }
  };

  

  

  return (
    <div className={styles.container}>
      <div className={styles.container_2}>
      <p className={styles.title}>Utwórz nową listę zakupów</p>
      <input
        type="text"
        placeholder="Nazwa listy"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick ={handleCreateList} className={styles.green_btn} >Utwórz listę</button>
    </div>
    </div>
  );
};

export default CreateShoppingList;

