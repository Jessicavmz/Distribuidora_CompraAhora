import React, { useState } from 'react';
import './Ingresar.css';

export default function Ingresar({ onLogin }) {
    
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
        Estado: 'ACTV',
        Roll: 'vendedor', // Valor predeterminado como vendedor
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
    
        const formData = new URLSearchParams();
        formData.append('Email', loginData.Email);
        formData.append('Password', loginData.Password);
    
        try {
            const response = await fetch('http://localhost:8080/Proyecto_CompraAhora/php/SelectUser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Cambia el tipo de contenido
                },
                body: formData.toString(), // Convierte los datos en formato x-www-form-urlencoded
            });
    
            
    
            if (response.headers.get('content-type').includes('application/json')) {
                const responseData = await response.json();
                
                if(responseData.success === true)
                {
                    console.log(responseData);
                    onLogin();
                }
                else
                {
                    console.log(responseData);
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        const formData1 = new URLSearchParams();
        formData1.append('IdUser', registerData.IdUser);
        formData1.append('Nombre', registerData.Nombre);
        formData1.append('Password', registerData.Password);
        formData1.append('Email', registerData.Email);
        formData1.append('Estado', registerData.Estado);
        formData1.append('Roll', registerData.Roll);

        try {
            const response = await fetch('http://localhost:8080/Proyecto_CompraAhora/php/InsertUser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Cambia el tipo de contenido
                },
                body: formData1.toString(), // Convierte los datos en formato x-www-form-urlencoded
            });

            if (response.headers.get('content-type').includes('application/json'))  {
                const responseData = await response.json();
                if (responseData.success === true) {
                    console.log(responseData.message);
                    window.location.href = '/'; // Replace with your index page URL
                } else {
                    console.log(responseData.message);
                }
            } else {
                // Manejar el fallo de registro (por ejemplo, mostrar un mensaje de error)
                console.log(response.message);
            }
        } catch (error) {
            console.error('Error durante el registro:', error);
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
                                    type="email"
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
                                    type="password"
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
