"use client";
import React, { useState } from 'react';
const Cuadro=({dato})=>{
    const [nombre, setNombre] = useState("");
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
export default Cuadro;