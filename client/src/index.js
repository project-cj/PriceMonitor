import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
