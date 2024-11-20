"use client"; // Marca el componente para que se ejecute en el cliente
/*
https://dlp-prestamo.vercel.app/PDRL?libro=[ID]
gttps://dlp-admin.vercel.app/
*/
import { useSearchParams } from 'next/navigation';
import QRCode from 'react-qr-code';
import { useRef, Suspense } from 'react';

export default function QRPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}> {/* Fallback que se muestra mientras el componente se carga */}
      <QRContent />
    </Suspense>
  );
}

function QRContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 1; // Default to 12 if no 'id' in search params
  const linkqr = `https://dlp-prestamo.vercel.app/PDRL?libro=${id}`;
  const qrRef = useRef();

  // Function to download QR code as PNG
  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const size = 256;
    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      const png = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = png;
      link.download = `codigo-qr-libroid-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };
  function handleClick() {
    window.location.href = '/';
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-custom-gradient">
      <h1 className="text-3xl md:text-5xl font-sans text-white mt-4 mb-8">¡Gracias por tu donación!</h1>
      <p className="text-customBlue font-sans text-center opacity-60 mb-8">A continuación, descargue e imprima el código QR y péguelo sobre su libro.</p>
      
      <div className="aspect-square w-96 bg-black bg-opacity-30 border-4 border-gray-700 rounded-[2vh] flex flex-col items-center mb-8">
        <p className="text-customBlue font-sans opacity-60 mt-4 mb-8">Id de tu libro: {id}</p>
        <div ref={qrRef}>
          <QRCode value={linkqr} size={250} className="border-8 border-white rounded-[2vh]" />
        </div>
      </div>

      <div className="flex items-center space-x-12 md:space-x-32">
        <button 
          onClick={handleClick} 
          className="bg-primary-gradient text-customGray font-semibold border-4 border-customBlue w-32 md:w-48 h-14 rounded transition-color duration-1000 hover:bg-gradient-hover mb-4"
        >
          Volver a donar
        </button>
        <button 
          onClick={downloadQR} 
          className="bg-primary-gradient text-customGray font-semibold border-4 border-customBlue w-32 md:w-48 h-14 rounded transition-color duration-1000 hover:bg-gradient-hover mb-4"
        >
          Descarga tu código QR
        </button>
      </div>
    </div>
  );
}