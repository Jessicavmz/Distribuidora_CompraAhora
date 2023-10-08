import React, { useEffect, useState } from 'react'
import './Productos.css';

export default function Productos(props) {
    const [listaProductos, setListaProductos] = useState([]);

    //console.log(props)
    useEffect(() => {
        leerServicio(props.ProveedorProductos);
    });

    const leerServicio = async(IdProveedor) => {
        const rutaServicio = "http://localhost:8080/Proyecto_CompraAhora/php/selecProductos.php?IdProveedor=" + IdProveedor;
        /*
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setListaProductos(data);
            });
        */

       const response = await fetch(rutaServicio);
       const data = await response.json();
       setListaProductos(data);

    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProductos.map(item =>
                        <tr key={item.CodigoProducto }>
                            <td>{item.CodigoProducto }</td>
                            <td>{item.Descripcion}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
    

    return (
        <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#tabla-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                        <i className="bi bi-list"></i>
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade" id="tabla-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                    {dibujarTabla()}
                </div>
            </div>
        </>
    )
}
