"use client";
import React, { useState } from 'react';
const CuadroTex=({dato,valor})=>{
    const [nombre, setNombre] = useState(`${valor}`);
    return(
        <input
            type="text"
            value={nombre}
            placeholder={dato}
            onChange={(e) => setNombre(e.target.value)}
            class="appearance-none rounded border-4 border-customBlue bg-primary-gradient w-72 md:w-1/3 placeholder-customGray"
        />
    );
}
export default CuadroTex;