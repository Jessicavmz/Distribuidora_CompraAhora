import React from 'react'
import contacto from './../assets/images/contacto.png';
import asesor1 from './../assets/images/asesor1.jpg';
import asesor2 from './../assets/images/asesor2.jpg';
import asesor3 from './../assets/images/asesor3.jpg';



export default function Contacto() {
    return (
        <section id="contacto" >
            <img src={contacto} className="d-block w-100" alt="..." />
            <div className="container p-5">
                <h2>Contacto:</h2>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div class="col">
                        <div class="card h-100">
                        <img src={asesor1} className="d-block w-100" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">Susana Jimenez</h5>
                                    <p class="card-text">Nuestra asesora de servicios brinda apoyo con los problemas o errores que la página puede presentar en el transcurso de tu compra online.</p>
                                </div>
                                <div class="card-footer">
                                    <small class="text-body-secondary">Atención 24 horas</small>
                                </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                        <img src={asesor2} className="d-block w-100" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">Paola Quiroz</h5>
                                    <p class="card-text">Nuestra asesora de call-center brinda apoyo en la primera compra online hasta realizar individualmente tu compra.</p>
                                </div>
                                <div class="card-footer">
                                <small class="text-body-secondary">Atención 24 horas</small>
                                </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                        <img src={asesor3} className="d-block w-100" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Pedro Chang</h5>
                                    <p className="card-text">Nuestro ejecutivo de ventas brinda información sobre si el pedido está listo y que día podrás recibir a nuestro delivery.</p>
                                </div>
                                <div className="card-footer">
                                <small className="text-body-secondary">Atención 24 horas</small>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}