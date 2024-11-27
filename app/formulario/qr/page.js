"use client"; 
import { Suspense } from "react";
import dynamic from "next/dynamic";

const QRPage = dynamic(() => import("./qr"), { ssr: false });

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <QRPage />
    </Suspense>
  );
}

// este archivo es necesario porque searchparams tiene que estar en algo que se llama "suspense boundary"
// y esto es el suspense boundary de qr
