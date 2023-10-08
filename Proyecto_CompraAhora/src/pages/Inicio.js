import React from 'react'
import Envios from '../home/Envios'
import Mapa from '../home/Mapa'
import MainBanner from '../home/MainBanner'
import Nosotros from '../home/Nosotros'
import Noticias from '../home/Noticias'

export default function Inicio() {
    return (
        <>
            <MainBanner />
            <Nosotros />
            <Noticias />
            <Mapa />
            {/* <Envios /> */}
        </>
    )
}
