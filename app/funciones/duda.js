import React, { useEffect, useState } from 'react';

const Duda = ({ isOpen, onClose }) => {
    const [termsText, setTermsText] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetch('/ISBN.txt')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al cargar los términos');
                    }
                    return response.text();
                })
                .then((text) => {
                    const formattedText = text.replace(/\n/g, '<br/>');
                    setTermsText(formattedText);
                })
                .catch((error) => {
                    console.error('Error fetching terms:', error);
                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const handleCloseClick = () => {
        onClose(); // Llama a la función onClose para cerrar el modal
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
            onClick={handleOverlayClick}
        >
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full shadow-lg relative">
                {/* Botón de cierre (X) */}
                <button 
                    onClick={handleCloseClick} 
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    &#10005;
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">¿Qué es el ISBN?</h2>
                <div className="text-gray-700 text-sm overflow-y-auto max-h-96" dangerouslySetInnerHTML={{ __html: termsText }} />
                <img 
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6HkGGUlZna7sbOqOQuhQn9XdKLpOYmlr1kmOMT0KY0QNvtsOBQTl7gvkgK1QRmXuonz1Pg2NfBg1clljFEF5z01NwGbDQXo-dODhM1ECllzRhMbACM7Q82QZqkor0k06adj1H2r6GWWum/s1600/Qu%25C3%25A9+es+un+ISBN.png" 
                    alt="Qué es un ISBN" 
                    className="w-auto md:max-w-full h-auto rounded-md"
                />
            </div>
        </div>
    );

};

export default Duda;