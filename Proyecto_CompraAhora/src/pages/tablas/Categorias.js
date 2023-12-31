import React, { useEffect, useState } from 'react'
import { ApiWebURL } from '../../utils';

export default function Categorias() {
    const [listaCategorias, setListaCategorias] = useState([]);
    const [idcategoria, setIdcategoria] = useState("");
    const [nombre, setNombre] = useState("");//valorinicialvacio
    const [descripcion, setDescripcion] = useState("");//valorinicialvacio

    useEffect(() => {
        leerServicio();
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "categorias.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setListaCategorias(data);
            });
    }

    const borrarCampos = () => {
        setNombre("");
        setDescripcion("");

    }

    const llenarCampos = (item) => {
        //console.log(item);
        setIdcategoria(item.idcategoria);
        setNombre(item.nombre);
        setDescripcion(item.descripcion);

    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaCategorias.map(item =>
                        <tr key={item.idcategoria}>
                            <td>{item.idcategoria}</td>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            <td><i className="bi bi-pencil-fill" onClick={() => llenarCampos(item)}
                            data-bs-toggle="modal" data-bs-target="#updateModal"></i></td>
                            <td><i className="bi bi-x-lg"></i></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const insertarFila = (event) => {
        event.preventDefault();
        //console.log(nombre + "..." + descripcion);
        document.querySelector("#insertModal .btn-close").click(); //querySelector seleccionaprimero
        const rutaServicio = ApiWebURL + "categoriasinsertar.php";

        let formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);

        //enviarinfoconfetch
        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })

            .then(response => response.text())
            .then(result => {
                leerServicio();
                alert("Se ha agregado la categoría" + nombre + ", con el código" + result);
            })


    }

    const actualizarFila = (event) => {
        event.preventDefault();
        //console.log(nombre + "..." + descripcion);
        document.querySelector("#updateModal .btn-close").click(); //querySelector seleccionaprimero
        const rutaServicio = ApiWebURL + "categoriasactualizar.php";

        let formData = new FormData();
        formData.append("idcategoria", idcategoria);
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);

        //enviarinfoconfetch
        fetch(rutaServicio, {
            method: "POST",
            body: formData
        }) .then(() => {
                leerServicio();
                alert("Se ha actualizado la categoría" + nombre + ", con el código" + idcategoria);
            })

    }

    const showInsertModal = () => {
        return (
            <div className="modal fade" id="insertModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nueva categoría</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={(event) => insertarFila(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className='form-control' placeholder='Nombre'
                                        value={nombre} required minLength={2}
                                        onChange={(event) => setNombre(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className='form-control' placeholder='Descripción'
                                        value={descripcion} required minLength={4}
                                        onChange={(event) => setDescripcion(event.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }

    const showUpdateModal = () => {
        return (
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar categoría</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={(event) => actualizarFila(event)}>
                            <div className="modal-body">

                                <div className="mb-3">
                                    <input type="text" className='form-control' 
                                        value={idcategoria} readOnly />
                                </div>

                                <div className="mb-3">
                                    <input type="text" className='form-control' placeholder='Nombre'
                                        value={nombre} required minLength={2}
                                        onChange={(event) => setNombre(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className='form-control' placeholder='Descripción'
                                        value={descripcion} required minLength={4}
                                        onChange={(event) => setDescripcion(event.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className='padded'>
                <div className="container">
                    <h2>Categorías</h2>
                    <div className="mb-3">
                        <button className='btn btn-primary' onClick={() => borrarCampos()}
                            data-bs-toggle="modal" data-bs-target="#insertModal">
                            Agregar Categoría
                        </button>
                    </div>
                    {dibujarTabla()}
                </div>
            </section>
            {showInsertModal()}
            {showUpdateModal()}

        </>
    )




}
