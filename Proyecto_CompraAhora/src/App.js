import React, { useState, useEffect } from 'react';
import './App.css';
import MainHeader from './common/MainHeader';
import MainFooter from './common/MainFooter';
import MainNav from './common/MainNav';
import Inicio from './pages/Inicio';
import Contacto from './home/Contacto';
import Categorias from './pages/tablas/Categorias';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Empleados from './pages/Empleados';
import Tienda from './pages/Tienda';
import ProductoDetalles from './pages/ProductoDetalles';
import Carrito from './pages/Carrito';
import Ingresar from './pages/Ingresar';
import Proveedores from './pages/Proveedores';

function App() {
  // Verificar si el usuario ha iniciado sesión utilizando localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = () => {
    // Set the isLoggedIn state to true when the user logs in
    setIsLoggedIn(true);
    // Guardar el estado de inicio de sesión en localStorage
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    // Cerrar la sesión y borrar el estado de inicio de sesión en localStorage
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  const renderRoutes = () => {
    if (isLoggedIn) {
      return (
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/productodetalles/:idproducto" element={<ProductoDetalles />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/categorias" element={<Categorias />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<Ingresar onLogin={handleLogin} />} />
        </Routes>
      );
    }
  };

  return (
    <BrowserRouter>
      <MainHeader />
      <MainNav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <main id="main-content">
        {renderRoutes()}
      </main>
      <MainFooter />
    </BrowserRouter>
  );
}

export default App;
