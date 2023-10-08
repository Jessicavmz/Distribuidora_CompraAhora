import React, { useEffect, useState } from 'react'
import { ApiWebURL } from '../utils';
import './Envios.css';

export default function Envios() {
    const [listaEnvios, setListaEnvios] = useState([]);

    useEffect(() => {
        leerServicio();
    },[])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "servicioenvios.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setListaEnvios(data);
            });
    }

    return (
        <section id="envios" className='padded'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Empresas de envío</h2>
                    </div>
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Empresa</th>
                                    <th>Teléfono</th>
                                </tr>
                            </thead>
                            <tbody>
                            {listaEnvios.map(item =>
                                    <tr key={item.idempresaenvio}>
                                        <td>{item.idempresaenvio}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.telefono}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}
