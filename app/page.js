"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { persona, codigo } from "./funciones/datos.js";
import { getIsbn } from "./funciones/globals.js";
import Image from "next/image";
// Donar Libros
export default function Home() {
  const router = useRouter();

  const [AutoresError, setAutoresError] = useState(false);//para ver si se escribio algo en autores
  const [tituloError, setTituloError] = useState(false);//para ver si se escribio algo en titulo
  const [correoError, setCorreoError] = useState(false);//para ver si se escribio algo en correo
  

  const handleGuardarClick = async () => {
    const correo = document.querySelector('input[name="correo"]')?.value || '';
    const tituloLibro = document.querySelector('input[placeholder="Escriba el Nombre Correctamente"]')?.value || '';
    const autores = document.querySelector('input[placeholder="Si es mas de uno separelo por comas"]')?.value || '';
    const generos = Array.from(document.querySelectorAll('input[name="Genero"]:checked')).map(e => e.value);
    const verifica = Array.from(document.querySelectorAll('input[name="VerificaImagen"]:checked')).map(e => e.value);
    let imagen64 = ''
    if(verifica[0]=="Si"){imagen64=document.querySelector('img[alt="Carátula"]')?.src}; 

    const anonimato = document.querySelector('input[name="anonimo"]:checked')?.value || '';
    const codigo = document.querySelector('input[placeholder="Escriba el ISBN sin puntos ni guiones"]')?.value || '';
    console.log("el codigo isbn es", codigo)

    if (correo.trim() === '' && anonimato === 'No') {
      setCorreoError(true);  // Si el título está vacío, mostramos el error
      return;  // Detener el proceso si el título no está rellenado
    }setCorreoError(false);

    if (!tituloLibro.trim()) {
      setTituloError(true);  // Si el título está vacío, mostramos el error
      return;  // Detener el proceso si el título no está rellenado
    }setTituloError(false); 

    if (!autores.trim()) {
      setAutoresError(true);  // Si el título está vacío, mostramos el error
      return;  // Detener el proceso si el título no está rellenado
    }setAutoresError(false); 


    const datosLibro = {
      titulo: tituloLibro,
      autores: autores,
      imagen: imagen64,
      //isbn: getIsbn(),
      isbn:'',
      tags: generos,
      donante: correo 
    };
    
  
    try {
      const response = await fetch('/api/libro', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosLibro),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error interno: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Respuesta de la API:', data);

    const id = data[0].id;
    console.log(id);
    router.push(`/formulario/qr?id=${id}`);

    console.log('ID recibido:', id);
    alert(`Datos enviados exitosamente. ID recibido: ${id}`);


  } catch (error) {
    console.error('Error al enviar los datos:', error.message);
    alert('Ocurrió un error al enviar los datos. Por favor, intenta nuevamente.');
  }

  /*const datosJSON = JSON.stringify(datosLibro, null, 2);
    const blob = new Blob([datosJSON], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    */
  };


return (
  <div className="min-h-screen gap-20 bg-custom-gradient">
    <header className="flex flex-col lg:flex-row gap-4 items-center border-b border-gray-400">
      <Image
        src="/images/logoBlanco.png"
        alt="Logo" 
        width={250} 
        height={250} 
        className="my-4 lg:mx-12 lg:my-6 bg-black bg-opacity-30 border-2 border-gray-700 rounded-[2vh]"
      />
      <h1 className="text-5xl font-sans text-white ">Donación</h1>
      <button
        onClick={() => window.location.href = "https://dlp-prestamo.vercel.app/catalogo"} 
        className="lg:absolute lg:top-8 lg:right-4 text-white"
        >⬆️ Ir al catálogo general.
      </button>
    </header>

    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/3 flex items-center my-8 ">
        <div className="hidden lg:block rounded-[2vh]">
          <Image
            src="/images/donaLibro.png"
            alt="Stickman" 
            width={300} 
            height={300} 
            className="rounded-lg mx-20 mb-4"
          />
          <p className="mx-8 text-center text-lg text-white font-sans">"Solidaridad no es dar lo que te sobra, sino dar lo que a otros les hace falta"</p>
        </div>
      </div>

      <div className="lg:w-2/3 space-y-4 p-8 text-center lg:text-left lg:overflow-y-auto lg:max-h-[calc(100vh-100px)]">
        <div className="persona">
          <h1 className="text-customBlue opacity-60 text-2xl font-semibold mb-4 font-sans">Información del Usuario</h1>
          <div>{persona(correoError)}</div>
        </div>

        <div className="libro">
          <h1 className="text-customBlue opacity-60 text-2xl font-semibold mb-4 font-sans">Información del Libro</h1>
          <div>{codigo(tituloError,AutoresError)}</div>
        </div>

        <div className="flex justify-center lg:justify-normal pt-4">
          <button className="bg-primary-gradient text-customGray font-semibold border-4 border-customBlue w-48 h-14 rounded transition-color duration-1000 hover:bg-gradient-hover" onClick={handleGuardarClick}>
            Guardar Información
          </button>
        </div>

      </div>
    </div>
  </div>
  )
}
