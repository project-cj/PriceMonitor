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
  {user && decode.status === "USER" && <Route path="/" element={<Main />} />}
  <Route path="/home" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/product" element={<ProductList />} />
  <Route path="/" element={<Home />} />
</Routes>

  )
}
export default App