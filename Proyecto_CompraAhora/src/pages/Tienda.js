import React, { useEffect, useState } from 'react';
import Productos from '../components/Productos';

export default function Tienda() {
    const [listaCategorias, setListaCategorias] = useState([]); // Inicializar como un array vacío
    const [ProveedorSeleccionado, setProveedorSeleccionado] = useState(null); // Initialize as null when no category is selected

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        const rutaServicio = "http://localhost:8080/Proyecto_CompraAhora/php/listProveedores.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                setListaCategorias(data);
            });
    }

    const seleccionarCategoria = (item) => {
        setProveedorSeleccionado(item);
    }

    return (
        <section id="tienda" className='padded'>
            <div className="container">
                <h2>Proveedores</h2>
                <div className="row">
                    <div className="col-md-3">
                        <ul className="list-group" id="lista-categorias">
                            <li
                                className={`list-group-item ${ProveedorSeleccionado === null ? 'active' : ''}`}
                                onClick={() => seleccionarCategoria(null)} // Clicking this will show all products
                            >
                                <h5>Todos los productos</h5>
                            </li>
                            {listaCategorias.map(item => (
                                <li
                                    className={`list-group-item ${item === ProveedorSeleccionado ? 'active' : ''}`}
                                    key={item.IdProveedor}
                                    onClick={() => seleccionarCategoria(item)}
                                >
                                    <h5>{item.Proveedor}</h5>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-9">
                        {ProveedorSeleccionado !== null ? (
                            <>
                                <h3>{ProveedorSeleccionado.Proveedor}</h3>
                                <Productos ProveedorProductos={ProveedorSeleccionado.IdProveedor} />
                            </>
                        ) : (
                            <div>
                                {/* You can add a message or default content when no category is selected */}
                                <h3>Selecciona un proveedor</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
