import { Route, Routes, Navigate } from "react-router-dom"
import jwt from "jwt-decode"

import Signup from "./components/Signup"
import Login from "./components/Login"
import PasswordReset from "./components/PasswordReset"

import Main from "./components/Main"
import Home from "./components/Home"
import ProductList from "./components/ProductList"
import ShopSearch from "./components/ShopSearch"
import Shop from "./components/Shop"
import Product from "./components/Product"
import PasswordResetChange from "./components/PasswordResetChange"
import ShoppingListsView from "./components/ShoppingListsView"
import CreateShoppingList from "./components/CreateShoppingList"
import UserPanel from "./components/UserPanel"
import ChangeAlias from "./components/ChangeAlias"
import ChangePassword from "./components/ChangePassword"


function App() {
  const user = localStorage.getItem("token")
  let decode = null
  if(user)
    decode = jwt(user)
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/passwordreset" element={<PasswordReset />} />
      <Route path="/passwordreset/change" element={<PasswordResetChange />} />
      {user && decode.status === "USER" && <Route path="/main" exact element={<Main />} />}
      
      {user && decode.status === "USER" && <Route path="/productsearch" exact element={<ProductList />} />}
      {user && decode.status === "USER" && <Route path="/shopsearch" exact element={<ShopSearch />} />}

      {user && decode.status === "USER" && <Route path="/shop" exact element={<Shop />} />}
      {user && decode.status === "USER" && <Route path="/product" exact element={<Product />} />}
      {user && decode.status === "USER" && <Route path="/shoppinglist" exact element={<ShoppingListsView />} />}
      {user && decode.status === "USER" && <Route path="/create-list" exact element={<CreateShoppingList />} />}
      {user && decode.status === "USER" && <Route path="/userpanel" exact element={<UserPanel />} />}
      <Route path="/userpanel" element={<Navigate replace to="/login" />} />

      {user && decode.status === "USER" && <Route path="/changealias" exact element={<ChangeAlias />} />}
      {user && decode.status === "USER" && <Route path="/changepassword" exact element={<ChangePassword />} />}

      <Route path="/home" exact element={<Home />} />

      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/*" element={<Navigate replace to="/home" />} />
    </Routes>
  )
}
export default App