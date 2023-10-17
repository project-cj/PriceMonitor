import { Route, Routes, Navigate } from "react-router-dom"
import jwt from "jwt-decode"

import Signup from "./components/Signup"
import Login from "./components/Login"

import Main from "./components/Main"
import Home from "./components/Home"
import ProductList from "./components/ProductList"


function App() {
  const user = localStorage.getItem("token")
  let decode = null
  if(user)
    decode = jwt(user)
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {user && decode.status === "USER" && <Route path="/main" exact element={<Main />} />}
      {user && decode.status === "USER" && <Route path="/product" exact element={<ProductList />} />}
      <Route path="/home" exact element={<Home />} />

      
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/*" element={<Navigate replace to="/home" />} />
    </Routes>
  )
}
export default App