import React from 'react'
import './Mapa.css';
import mapa from './../assets/images/mapa.jpeg';
import personaje from './../assets/images/personaje.png';


export default function Nosotros() {
    return (
        <section id="nosotros" className='padded'>
            <div className="container">
                <h2>Sobre Nosotros</h2>

                <div class="container text-right">
                    <div class="row">
                        <div class="col ">
                            <h1> Disponibles en todo <br>
                            </br> Lima Norte</h1>
                            <img src={personaje} className="d-block w-100 personaje" alt="..."/>

                        </div>
                        <div class="col">
                        <img src={mapa} className="d-block w-100" alt="..."/>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}