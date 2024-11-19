import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const [termsText, setTermsText] = useState('');
 
  useEffect(() => {
    if (isOpen) { // Solo cargar si el modal está abierto
      fetch('/terminos.txt') 
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al cargar los términos');
          }
          return response.text(); // Devuelve el texto de la respuesta
        })
        .then((text) => {
          // Reemplaza saltos de línea por <br/>
          const formattedText = text.replace(/\n/g, '<br/>');
          setTermsText(formattedText); // Almacena el texto en el estado
        })
        .catch((error) => {
          console.error('Error fetching terms:', error); // Maneja cualquier error
        });
    }
  }, [isOpen]); // Dependencia: se ejecuta cada vez que `isOpen` cambia
 
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &#10005; {/* Botón para cerrar */}
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Términos y Condiciones</h2>
        <div
          className="text-gray-700 text-sm overflow-y-auto max-h-96"
          dangerouslySetInnerHTML={{ __html: termsText }}
        />
      </div>
    </div>
  );
};

export default Modal;