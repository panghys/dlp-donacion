"use client";
import { useRouter } from "next/navigation";
import { persona, codigo } from "./funciones/datos.js";
import Image from "next/image";
// Donar Libros
export default function Home() {
  const router = useRouter();
  const handleGuardarClick = () => {
    
    const correo = document.querySelector('input[name="correo"]')?.value || '';
    const tituloLibro = document.querySelector('input[placeholder="Escriba el Nombre Correctamente"]')?.value || '';
    const autores = document.querySelector('input[placeholder="Si es mas de uno separelo por comas"]')?.value || '';
    const generos = Array.from(document.querySelectorAll('input[name="Genero"]:checked')).map(e => e.value);
    const imagen64=document.querySelector('img[alt="Caratula"]')?.src  || '';
  
    const datosLibro = {
      titulo: tituloLibro,
      autores: autores,
      tags: generos,
      donante: correo,
      prestado: false,
      borrado: false,
      imagen:imagen64
    };
  
   
    const datosCompletos = {
      libro: datosLibro,
    };
  
    const datosJSON = JSON.stringify(datosCompletos, null, 2);
    const blob = new Blob([datosJSON], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'datos_donacion.json';
    link.click();
    URL.revokeObjectURL(link.href);
    router.push("/formulario/qr");
  };
  

  //
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
      <h1 className="text-5xl font-sans text-white ">Donacion</h1>
      <button className="lg:absolute lg:top-8 lg:right-4 text-white">⬆️ Ir al catálogo general.</button>
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
          <h1 className="text-customBlue opacity-60 text-2xl font-semibold mb-4 font-sans">Informacion del Usuario</h1>
          <div>{persona()}</div>
        </div>

        <div className="libro">
          <h1 className="text-customBlue opacity-60 text-2xl font-semibold mb-4 font-sans">Informacion del Libro</h1>
          <div>{codigo()}</div>
        </div>

        <div className="flex space-x-12 md:space-x-32 justify-center lg:justify-normal pt-4">
          <button className="bg-primary-gradient text-customGray font-semibold border-4 border-customBlue w-48 h-14 rounded transition-color duration-1000 hover:bg-gradient-hover">Atrás</button>
          <button className="bg-primary-gradient text-customGray font-semibold border-4 border-customBlue w-48 h-14 rounded transition-color duration-1000 hover:bg-gradient-hover" onClick={handleGuardarClick}>
            Guardar Información
          </button>
        </div>

      </div>
    </div>
  </div>
  )
}