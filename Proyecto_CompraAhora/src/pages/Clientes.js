import React, { useEffect, useState } from 'react'
import { ApiWebURL } from '../utils';

export default function Clientes() {
    const [listaClientes, setListaClientes] = useState([]);
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [textoBuscar, setTextoBuscar] = useState("");


    useEffect(() => {
        leerServicio();
    }, [])

    const leerServicio = () => {
        const rutaServicio =  ApiWebURL + "servicioclientes.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setListaClientes(data);
                setDatos(data);
                setCargando(false);
            });
        let encabezadosClientes = document.querySelectorAll("#clientes-encabezado th");
        //querySelectorAll selecciona todos los objetos especificados y los almacena en el arreglo encabezadosclientes
        encabezadosClientes.forEach(item => {
            //forEach examina uno a uno los elementos del arreglo
            item.addEventListener("click", () => seleccionarEncabezado())
        }) 
    }

    const seleccionarEncabezado = () => {
        console.log("Hola");
    }

    const dibujarTabla = () => {
        return(
            <table className="table">
                    <thead id='clientes-encabezado'>
                        <tr>
                            <th campo="idcliente">Código</th>
                            <th campo="empresa">Empresa</th>
                            <th campo="nombres">Contacto</th>
                            <th campo="cargo">Cargo</th>
                            <th campo="direccion">Dirección</th>
                            <th campo="ciudad">Ciudad</th>
                            <th campo="pais">País</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map(item =>
                            <tr key={item.idcliente}>
                                <td>{item.idcliente}</td>
                                <td>{item.empresa}</td>
                                <td>{item.nombres}</td>
                                <td>{item.cargo}</td>
                                <td>{item.direccion}</td>
                                <td>{item.ciudad}</td>
                                <td>{item.pais}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
        )
    }

    const buscar = () => {
        let datosFiltrados = listaClientes.filter( item => { 
            return textoBuscar === ""
            ? true
            : item["idcliente"].toLowerCase().indexOf(textoBuscar.toLowerCase())>-1 ||
            item["empresa"].toLowerCase().indexOf(textoBuscar.toLowerCase())>-1 ||
            item["nombres"].toLowerCase().indexOf(textoBuscar.toLowerCase())>-1 ||
            item["cargo"].toLowerCase().indexOf(textoBuscar.toLowerCase())>-1 ||
            item["direccion"].toLowerCase().indexOf(textoBuscar.toLowerCase())>-1 ||
            item["ciudad"].toLowerCase().indexOf(textoBuscar.toLowerCase())>-1 ||
            item["pais"].toLowerCase().indexOf(textoBuscar.toLowerCase())>-1
        });
        setDatos(datosFiltrados);
    }
    return (
        <section className='padded'>
            <div className="container">
                <h2>Clientes</h2>

            <div className="mb-3">
                <input type="text" placeholder='Ingrese expresión a buscar' className='form-control'
                value={textoBuscar} onChange={(event) => setTextoBuscar(event.target.value)}/>
                <button className='btn btn-primary' onClick={()=>buscar()}>Buscar</button>
            </div>


            {cargando
                ?<div className="spinner"></div> 
                :dibujarTabla()}
            </div>
        </section>
    )
}