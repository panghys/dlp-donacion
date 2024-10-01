"use client";
import {  persona,libro } from "./funciones/datos.js";
//Donar Libros
export default function Home() {
  return (
  <div>
    <h1 className="titulo">Donar Libros</h1>
    <div className="cuestionario">
      <h1 className="titulo1">Informacion del Usuario</h1>
      <div>{persona()}</div>
    </div>

    <div className="cuestionario">
      <h1 className="titulo1">Informacion del Libro</h1>
      <div>{libro()}</div>
        
    </div>

    <div className='footer'>
      <button className='btn'>Atras</button>
      <button className='btn'>Guardar</button>
    </div>
  </div>
  )
}
