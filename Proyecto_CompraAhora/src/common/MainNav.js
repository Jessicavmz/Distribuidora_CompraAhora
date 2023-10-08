import React from 'react'
import './MainNav.css';
import { Link } from 'react-router-dom'
import logo from './../assets/images/logo.png';

export default function MainNav() {
    return (
        <nav id="main-nav" className="navbar navbar-expand-lg navbar-dark bg-light sticky-top">
            <div className="container">
                <a className="navbar-brand" href="/">
                <img src={logo} className="d-block w-50" alt="..."/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#nosotros">Nosotros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#noticias">Valores</a>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/inversiones">Inversiones</Link>
                        </li> */}
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/proveedores">Proveedores</Link>
                        </li> */}
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/clientes">Clientes</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/empleados">Marcas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tienda">Tienda</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/contacto">Contacto</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/ingresar">Ingresar</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/categorias">Categorias</Link>
                        </li> */}
                        <Link className="nav-link" to="/https://www.facebook.com/">
                            <i class="bi bi-facebook"></i>
                            </Link>
                            <Link className="nav-link" to="/carrito">
                            <i class="bi bi-whatsapp"></i>
                            </Link>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link " to="/carrito">
                            <i className="bi bi-basket-fill"></i>
                            </Link>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
