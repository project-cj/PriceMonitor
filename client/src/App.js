import { Route, Routes, Navigate } from "react-router-dom"
import jwt from "jwt-decode"
import 'leaflet/dist/leaflet.css';

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
import ShoppingList from "./components/ShoppingList"
import UserPanel from "./components/UserPanel"
import ChangeAlias from "./components/ChangeAlias"
import ChangePassword from "./components/ChangePassword"
import ShopProposal from "./components/ShopProposal"
import ProductAdd from "./components/ProductAdd"

import AdminAccountManager from "./components/AdminAccountManager";
import AdminShopProposal from "./components/AdminShopProposal";
import AdminShopProposalEdit from "./components/AdminShopProposalEdit";


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
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/main" exact element={<Main />} />}
      
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/productsearch" exact element={<ProductList />} />}
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/shopsearch" exact element={<ShopSearch />} />}

      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/shop" exact element={<Shop />} />}
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/product" exact element={<Product />} />}
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/shoppinglists" exact element={<ShoppingListsView />} />}
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/create-list" exact element={<CreateShoppingList />} />}
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/shoppinglist" exact element={<ShoppingList />} />}
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/userpanel" exact element={<UserPanel />} />}
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/shopproposal" exact element={<ShopProposal />} />}
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/productadd" exact element={<ProductAdd />} />}

      <Route path="/userpanel" element={<Navigate replace to="/login" />} />

      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/changealias" exact element={<ChangeAlias />} />}
      {user && (decode.status === "USER" || decode.status === "ADMIN") && <Route path="/changepassword" exact element={<ChangePassword />} />}

      {user && decode.status === "ADMIN" && <Route path="/admin/shopproposal" exact element={<AdminShopProposal />}/>}
      {user && decode.status === "ADMIN" && <Route path="/admin/shopproposal/edit" exact element={<AdminShopProposalEdit />}/>}
      {user && decode.status === "ADMIN" && <Route path="/admin/manageusers" exact element={<AdminAccountManager />}/>}

      <Route path="/home" exact element={<Home />} />

      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/*" element={<Navigate replace to="/home" />} />
    </Routes>
  )
}
export default App