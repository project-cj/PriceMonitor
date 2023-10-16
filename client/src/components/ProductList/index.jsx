import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania produktów.");
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
  };

  return (
    <div className={styles.productListContainer}>
      <h2>Lista Produktów</h2>
      {error && <p>{error}</p>}
      <select onChange={(e) => handleProductSelect(e.target.value)}>
        <option value="">Wybierz produkt</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      {selectedProduct && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa</th>
              <th>Kod</th>
              <th>ID Marki</th>
              <th>ID Podkategorii</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedProduct.id}</td>
              <td>{selectedProduct.name}</td>
              <td>{selectedProduct.code}</td>
              <td>{selectedProduct.Brand_id}</td>
              <td>{selectedProduct.Subcategory_id}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;