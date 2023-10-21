import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export default function Proveedores() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [registerDataProv, setRegisterDataProv] = useState({
    IdProveedor: '',
    Proveedor: ''
  });

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = "http://localhost:8080/Proyecto_CompraAhora/php/listProveedores.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        setListaProveedores(data);
        setCargando(false);
      });
  };

  const handleGuardarProveedor = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('IdProveedor', registerDataProv.IdProveedor);
    formData.append('Proveedor', registerDataProv.Proveedor);
    try {
        const response = await fetch('http://localhost:8080/Proyecto_CompraAhora/php/InsertProveedor.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Cambia el tipo de contenido
            },
            body: formData.toString(), // Convierte los datos en formato x-www-form-urlencoded
        });

        if (response.headers.get('content-type').includes('application/json'))  {
            const responseData = await response.json();
            if (responseData.success === true) {
                setMostrarModal(false); // Replace with your index page URL
                // Recargar la página
                window.location.reload();
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

  const dibujarTabla = () => {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>
          Agregar Proveedor
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {listaProveedores.map((item) => (
              <tr key={item.IdProveedor}>
                <td>{item.IdProveedor}</td>
                <td>{item.Proveedor}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Proveedor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="IdProveedor">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Código del Proveedor"
                  value={registerDataProv.IdProveedor}
                  onChange={(e) => setRegisterDataProv({ ...registerDataProv, IdProveedor: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="Proveedor">
                <Form.Label>Empresa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre de la Empresa"
                  value={registerDataProv.Proveedor}
                  onChange={(e) => setRegisterDataProv({ ...registerDataProv, Proveedor: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setMostrarModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleGuardarProveedor}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <section id="proveedores" className="padded">
      <div className="container">
        <h2>Proveedores</h2>
        {cargando ? <div className="spinner"></div> : dibujarTabla()}
      </div>
    </section>
  );
}
