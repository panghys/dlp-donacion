"use client";
import React, { useState } from 'react';
import formulario from "@/app/formulario/donador.json";
import Libro from "@/app/formulario/libro.json";
import Modal from "./modal.js";
import Duda from "./duda.js";
import { si_ISBN, no_ISBN ,ISBN_no_funciona} from "@/app/funciones/datos _libro.js";
import { isbndatos } from "@/app/funciones/datos_isbn.js";
import { setIsbn } from "./globals";

export function persona(correoError) {
    const [opcionSeleccionadaPersona, setOpcionSeleccionadaPersona] = useState('');
    const handleOpcionPersonaChange = (e) => {
        setOpcionSeleccionadaPersona(e.target.value);
    }; 
    const [isModalOpen, setModalOpen] = useState(false); 
    const [hasSeenTerms, setHasSeenTerms] = useState(false); 
    const [isChecked, setChecked] = useState(false); 
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
    const handleModalClose = () => {
        setHasSeenTerms(true); // Marca que ha visto los términos
        setModalOpen(false); // Cierra el modal
    };

    return (
        <div>
            {formulario.tes.map((pregunta, i) => (
                <div className='mb-6' key={i}>
                    <div className="text-lg text-white opacity-60 mb-4 font-sans">{pregunta.pregunta}</div> {/* Mostrar la pregunta */}
                    <div className='flex justify-center lg:justify-normal space-x-36'>
                        {pregunta.opciones.map((opcion, j) => (
                            <label key={j} className="flex items-center space-x-2 text-white opacity-60">
                                <input
                                    type={pregunta.tipo}
                                    name={pregunta.id}
                                    value={opcion}
                                    onChange={handleOpcionPersonaChange}
                                    className="appearance-none w-5 h-5 bg-white checked:bg-primary-gradient border-2 rounded"
                                />
                                <span>{opcion}</span>
                            </label>
                        ))}
                        
                    </div>
                </div>
            ))}
            
            {opcionSeleccionadaPersona !== 'Si' && opcionSeleccionadaPersona !== '' && (
                <div >
                    <div className='mb-6 opacity-60'>
                            <div className='text-white font-semibold text-xl'>Correo electrónico: </div>
                            <input 
                                type="email" 
                                name="correo" 
                                placeholder="ejemplo@gmail.com" 
                                class="appearance-none rounded border-4 border-customBlue bg-primary-gradient w-72 lg:w-1/3 placeholder-customGray"
                            />
                            {   correoError && (
                                <div className="flex items-center mt-2">
                                    <button className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">!</button>
                                    <span className="text-white text-lg">Escriba su correo antes de avanzar</span>
                                </div>
                             )}
                    </div>
                    <div className='rellenar'>
                        <label>
                            <div class="flex items-center justify-center lg:justify-normal opacity-60">
                                <input 
                                    type="checkbox" 
                                    checked={isChecked} 

                                    onChange={(e) => setChecked(e.target.checked)} disabled={!hasSeenTerms}
                                    className="appearance-none w-5 h-5 bg-white checked:bg-primary-gradient border-2 rounded" 
                                />
                                <h2 className="mx-2 text-white">Terminos y Condiciones</h2>
                            </div>
                            <button className="texto-enlace text-customBlue font-sans text-center opacity-60 mb-4 underline"  onClick={toggleModal} >Si desea leer los términos, haga clic aquí</button>
                            <Modal isOpen={isModalOpen} onClose={handleModalClose} />
                        </label>
                    </div>
                </div>
                
            )}
        </div>
    );
}

export function codigo(tituloError,AutoresError) {
    const [opcionSeleccionadaCodigo, setOpcionSeleccionadaCodigo] = useState('');
    const [mostrarContenido, setMostrarContenido] = useState(false);
    const [mostrarISBN, setMostrarISBN] = useState(false);

    // Estados para almacenar el título y autor
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [imagen, setImagen] = useState('');

    const [isDudaVisible, setDudaVisible] = useState(false);  // Añadido el estado para mostrar la duda

    const handleOpcionCodigoChange = (e) => {
        const seleccion = e.target.value;
        setOpcionSeleccionadaCodigo(seleccion);
        setMostrarContenido(false); // Ocultar el contenido anterior
        if (seleccion === 'Si') {
            setMostrarISBN(true); // Muestra el campo ISBN
        } else {
            setMostrarISBN(false); // Oculta el campo ISBN
            setMostrarContenido(true); // Muestra el contenido de no_ISBN
            setOpcionSeleccionadaCodigo('');
        }    
    };

    const siguienteClick = async () => {
        setMostrarContenido(true); // Muestra el contenido al hacer clic
        setMostrarISBN(false); // Oculta el campo ISBN
        

        const isbn = document.querySelector('input[name="codigo"]').value; // Obtén el valor del ISBN ingresado
        const datosLibro = await isbndatos(isbn);  // Llama a la función isbndatos para obtener los datos
        
        
        if (datosLibro) {
            setTitulo(datosLibro.titulo);  // Rellena el título
            setAutor(datosLibro.autor);    // Rellena el autor
            setImagen(datosLibro.imagen);  //Rellena la imagen
            setIsbn(isbn);
        } else {
            // Si no se encuentran los datos, puedes manejar el error (por ejemplo, mostrando un mensaje)
            alert("No se encontró el libro con este ISBN.");
        }
    };

    const respuesClick = () => {
        setDudaVisible(true); // Muestra el modal de duda
    };

    const handleModalClose = () => {
        setDudaVisible(false); // Cierra el modal de duda
    };

    return (
        <div>
            {/* Renderiza las preguntas del formulario */}
            {Libro.Codigo.map((pregunta, i) => (
                <div className='mb-6' key={i}>
                    <div className="opacity-60">
                        <div className="text-lg text-white font-sans">{pregunta.pregunta}</div>
                        
                        <button className= "text-customBlue font-sans text-center mb-4 underline" onClick={respuesClick}>¿Qué es un ISBN?</button>
                    </div>
                    <div className='flex justify-center lg:justify-normal space-x-36'>
                        {pregunta.opciones.map((opcion, j) => (
                            <label key={j} className="flex items-center space-x-2 text-white opacity-60">
                                <input
                                    type={pregunta.tipo}
                                    name={pregunta.id}
                                    value={opcion}
                                    onChange={handleOpcionCodigoChange}
                                    className="appearance-none w-5 h-5 bg-white checked:bg-primary-gradient border-2 rounded"
                                />
                                <span>{opcion}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            {opcionSeleccionadaCodigo === 'Si' && mostrarISBN && (
                <div>
                    <div className='mb-6 opacity-60'>
                        <div className='text-white font-semibold text-xl'>ISBN:</div>
                        <input 
                            type="text" 
                            name="codigo"
                            placeholder="Escriba el ISBN sin puntos ni guiones"
                            class="appearance-none rounded border-4 border-customBlue bg-primary-gradient w-72 lg:w-1/3 placeholder-customGray"
                        />
                    </div>
                    <button className="bg-primary-gradient text-customGray font-semibold border-4 border-customBlue w-32 h-10 rounded transition-color duration-1000 hover:bg-gradient-hover opacity-60" onClick={siguienteClick}>Siguiente</button>
                </div>  
            )}
            {mostrarContenido && (
               <div>
                   
                   {opcionSeleccionadaCodigo != 'Si' ? no_ISBN(tituloError,AutoresError) : (titulo!=null && autor!=null)?si_ISBN(titulo,autor,imagen) : ISBN_no_funciona(tituloError,AutoresError)}
                </div>
            )}
            {/* Si se rellenaron los datos, mostrar los campos de título y autor */}
            {/* Aun faltaria ver si cambia en tailwind */}
            
            {isDudaVisible && (
                <div className="rellenar">
                    <Duda isOpen={isDudaVisible} onClose={handleModalClose}/>
                </div>
            )}
        </div>
    );
}
