import React, { useState } from 'react';
import './Ingresar.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Ingresar() {
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({
        Email: '',
        Password: '',
    });
    const [registerData, setRegisterData] = useState({
        IdUser: '',
        Nombre: '',
        Password: '',
        Email: '',
        Estado: '',
        Roll: '', // Valor predeterminado como vendedor
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e, form) => {
        const { name, value } = e.target;
        if (form === 'login') {
            setLoginData({
                ...loginData,
                [name]: value,
            });
        } else if (form === 'register') {
            setRegisterData({
                ...registerData,
                [name]: value,
            });
        }
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        // Make a POST request to the SelectUsers PHP script
        try {
            const response = await fetch('http://localhost:8080/Proyecto_CompraAhora/php/SelectUser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                // Handle successful login response (e.g., redirect to the index page)
                window.location.href = '/'; // Replace with your index page URL
            } else {
                // Handle login failure (e.g., display an error message)
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        // Make a POST request to the insertUser PHP script
        try {
            const response = await fetch('http://localhost:8080/Proyecto_CompraAhora/php/InsertUser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            if (response.ok) {
                window.location.href = '/';
                // Handle successful registration response (e.g., display a success message)
            } else {
                // Handle registration failure (e.g., display an error message)
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <section id="ingresar" className="padded">
            <div className="container">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a
                            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => handleTabChange('login')}
                        >
                            Login
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => handleTabChange('register')}
                        >
                            Register
                        </a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div
                        className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}
                        id="pills-login"
                        role="tabpanel"
                    >
                        <form onSubmit={handleSubmitLogin}>
                            
                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input
                                    type="Email"
                                    className="form-control"
                                    id="Email"
                                    name="Email"
                                    value={loginData.Email}
                                    onChange={(e) => handleInputChange(e, 'login')}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="Password"
                                    className="form-control"
                                    id="Password"
                                    name="Password"
                                    value={loginData.Password}
                                    onChange={(e) => handleInputChange(e, 'login')}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-4">
                                Sign in
                            </button>
                        </form>
                    </div>
                    <div
                        className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''}`}
                        id="pills-register"
                        role="tabpanel"
                    >
                        <form onSubmit={handleSubmitRegister}>
                        <div className="form-group">
                                <label htmlFor="IdUser">DNI</label>
                                <input
                                    type="Number"
                                    className="form-control"
                                    id="IdUser"
                                    name="IdUser"
                                    value={registerData.IdUser}
                                    onChange={(e) => handleInputChange(e, 'register')}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Nombre">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Nombre"
                                    name="Nombre"
                                    value={registerData.Nombre}
                                    onChange={(e) => handleInputChange(e, 'register')}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="Password"
                                    className="form-control"
                                    id="Password"
                                    name="Password"
                                    value={registerData.Password}
                                    onChange={(e) => handleInputChange(e, 'register')}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input
                                    type="Email"
                                    className="form-control"
                                    id="Email"
                                    name="Email"
                                    value={registerData.Email}
                                    onChange={(e) => handleInputChange(e, 'register')}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Estado">Estado</label>
                                <select
                                    className="form-control"
                                    id="Estado"
                                    name="Estado"
                                    value={registerData.Estado}
                                    onChange={(e) => handleInputChange(e, 'register')}
                                >
                                    <option value="ACTV">Activo</option>
                                    <option value="INAC">Inactivo</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Roll">Roll</label>
                                <select
                                    className="form-control"
                                    id="Roll"
                                    name="Roll"
                                    value={registerData.Roll}
                                    onChange={(e) => handleInputChange(e, 'register')}
                                >
                                    <option value="vendedor">Vendedor</option>
                                    <option value="Comprador">Comprador</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-3">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
