"use client";
import React, { useState } from 'react';
import formulario from "@/app/formulario/donador.json";
import Cuadro from "@/app/funciones/ctexto.js";
import Bot from "@/app/funciones/checkbox.js";
import Libro from "@/app/formulario/libro.json";

export function persona() {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

    const handleOpcionChange = (e) => {
        setOpcionSeleccionada(e.target.value);
    };

    return (
        <div>
            {formulario.tes.map((pregunta, i) => (
                <div className='precionar' key={i}>
                    <div className="titulo1">{pregunta.pregunta}</div> {/* Mostrar la pregunta */}
                    <div className='rellenar'>
                        {pregunta.opciones.map((opcion, j) => (
                            <label key={j}>
                                <input
                                    type={pregunta.tipo}
                                    name={pregunta.id}
                                    value={opcion}
                                    onChange={handleOpcionChange}
                                />
                                {opcion}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            
            {opcionSeleccionada !== 'Si' && (
                <div className='rellenar'>
                    <label>
                        Correo:
                        <input type="email" name="correo" />
                    </label>
                </div>
            )}
        </div>
    );
}

export function libro(){
    return(
        <div>
            {Libro.cuadrotx.map((preg)=>(
            <div className='rellenar'>
                <div className='tex'>{preg.id}</div>
                <Cuadro dato={preg.gris}></Cuadro>
            </div>
            ))}
            {Libro.tes.map((pregunta, i) => (
                <div className='precionar' key={i}>
                    <div className="titulo1">{pregunta.pregunta}</div> {/* Mostrar la pregunta */}
                    <div className='rellenar'>
                        {pregunta.opciones.map((opcion, j) => (
                            <label key={j}>
                                <input type={pregunta.tipo} name={pregunta.id} value={opcion} />
                                {opcion}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
