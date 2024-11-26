"use client";
import React, { useState } from 'react';
import Cuadro from "@/app/funciones/ctexto.js";
import Libro from "@/app/formulario/libro.json";

export function no_ISBN(){
    return(
        <div className="opacity-60">
            <div className='text-customBlue font-sans mb-4'>Rellene manualmente los datos</div>
            {Libro.cuadrotx.map((preg,j)=>(
            <div className='mb-6'>
                <div className='text-white font-semibold text-xl'>{preg.id}</div>
                <Cuadro dato={preg.gris}></Cuadro>
            </div>
            ))}
            {Libro.tes.map((pregunta, i) => (
                <div className='precionar' key={i}>
                    <div className='text-white font-semibold text-xl mb-6'>{pregunta.pregunta}</div> {/* Mostrar la pregunta */}
                    <div className='rellenar'>
                        <div className='grid grid-cols-2 md:grid-cols-3 md:mx-auto lg:mx-0 lg:grid-cols-4 gap-4 w-full md:w-3/4 text-white'>
                        {pregunta.opciones.map((opcion, j) => (
                            <label key={j} className="flex items-center space-x-2">
                                <input 
                                    type={pregunta.tipo} 
                                    name={pregunta.id} 
                                    value={opcion} 
                                    class="appearance-none w-5 h-5 bg-white checked:bg-primary-gradient border-2 rounded"
                                />
                                <span>{opcion}</span>
                            </label>
                        ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};
//en esta funcion se tendria que despues analizar si funciona  la libreria, si no tendria que ir a la funcion no_ISBN(), Aparte que se tendria que agregar a esta 
//funcion que se vea la imagen del libro, donde se tendria que confirmar la imagen del libro o no 
export function si_ISBN(titulo,autor,imagen){
    console.log(imagen);
    
    return(
        <div className="">
            <div className='text-customBlue font-sans mb-4 opacity-60'> Asegurate que los datos del libro esten todos correctos</div>
            
            <div className='opacity-60 mb-6'>
                <div className='text-white font-semibold text-xl'>{"Nombre del Libro"}</div>
                <input type="text" value={titulo} readOnly  placeholder={"Escriba el Nombre Correctamente"}
                class="appearance-none rounded border-4 border-customBlue bg-primary-gradient w-72 md:w-1/3 placeholder-customGray"/>
            </div>
            
            <div className='opacity-60 mb-6'>
                <div className='text-white font-semibold text-xl'>{"Nombre del Autor"}</div>
                <input type="text" value={autor} readOnly placeholder={"Si es mas de uno separelo por comas"}
                class="appearance-none rounded border-4 border-customBlue bg-primary-gradient w-72 md:w-1/3 placeholder-customGray"/>
            </div>
            
            <div className='mb-6'>
                <div className='text-white font-semibold text-xl opacity-60'>Portada</div>
                <h1 className="text-lg text-white font-sans mb-4 opacity-60">¿Es esta la portada de su libro?</h1>
                <div className="flex justify-center lg:justify-normal">
                    <img 
                        src={imagen}
                        alt="Carátula"
                        className="w-48 h-80 rounded-md border-4 border-black shadow-lg mb-6"
                    />
                </div>
                <div className="flex space-x-12 justify-center lg:justify-normal mb-10 opacity-60">
                    <button className="bg-primary-gradient text-customGray font-semibold border-4 border-customBlue w-32 h-10 rounded transition-color duration-1000 hover:bg-gradient-hover">Si</button>
                    <button className="bg-primary-gradient text-customGray font-semibold border-4 border-customBlue w-32 h-10 rounded transition-color duration-1000 hover:bg-gradient-hover">No</button>
                </div>
            </div>
            
           
            {Libro.tes.map((pregunta, i) => (
                <div className='precionar opacity-60' key={i}>
                    <div className='text-white font-semibold text-xl mb-6'>{pregunta.pregunta}</div> {/* Mostrar la pregunta */}
                    <div className='rellenar'>
                        <div className='grid grid-cols-2 md:grid-cols-3 md:mx-auto lg:mx-0 lg:grid-cols-4 gap-4 w-full md:w-3/4 text-white'>
                        {pregunta.opciones.map((opcion, j) => (
                            <label key={j} className="flex items-center space-x-2">
                                <input 
                                    type={pregunta.tipo} 
                                    name={pregunta.id} 
                                    value={opcion}
                                    class="appearance-none w-5 h-5 bg-white checked:bg-primary-gradient border-2 rounded"
                                />
                                <snap>{opcion}</snap>
                            </label>
                        ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function ISBN_no_funciona(){
    return(
        <div className="opacity-60">
            <div className='text-orange-300 font-sans mb-4'> No se ha encontrado el libro en la libreria.
                Rellene manualmente los datos
            </div>
            {Libro.cuadrotx.map((preg,j)=>(
            <div className='mb-6'>
                <div className='text-white font-semibold text-xl'>{preg.id}</div>
                <Cuadro dato={preg.gris}></Cuadro>
            </div>
            ))}
            {Libro.tes.map((pregunta, i) => (
                <div className='precionar' key={i}>
                    <div className='text-white font-semibold text-xl'>{pregunta.pregunta}</div> {/* Mostrar la pregunta */}
                    <div className='rellenar'>
                        <div className='grid grid-cols-2 md:grid-cols-3 md:mx-auto lg:mx-0 lg:grid-cols-4 gap-4 w-full md:w-3/4 text-white'>
                        {pregunta.opciones.map((opcion, j) => (
                            <label key={j} className="flex items-center space-x-2">
                                <input 
                                    type={pregunta.tipo} 
                                    name={pregunta.id} 
                                    value={opcion} 
                                    class="appearance-none w-5 h-5 bg-white checked:bg-primary-gradient border-2 rounded"
                                />
                                <span>{opcion}</span>
                            </label>
                        ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};