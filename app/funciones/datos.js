"use client";
import formulario from "@/app/formulario/donador.json"
import Cuadro from "@/app/funciones/ctexto.js"
import Bot from "@/app/funciones/checkbox.js"
import Libro from "@/app/formulario/libro.json"
export function persona(){
    return(
        <div>
            {formulario.cuadrotx.map((preg,i)=>(
                <div className='rellenar'>
                    <div className='tex'>{preg}</div>
                    <Cuadro></Cuadro>
                </div>
            ))}
     
            {formulario.tes.map((pregunta,i)=>(
                <div className='precionar' >
                    <div className="titulo1">{pregunta.id}</div>
                    <div className='rellenar'>
                        {formulario.tes[i].title.map((title)=>(
                            <div>
                                <Bot></Bot>
                                {title}
                            </div>
                                 
                        ))}
                    </div>
                </div>    
            ))}
        </div>
    )
}
export function libro(){
    return(
        <div>
            {Libro.cuadrotx.map((preg)=>(
            <div className='rellenar'>
                <div className='tex'>{preg}</div>
                <Cuadro></Cuadro>
            </div>
            ))}
            {Libro.tes.map((pregunta,i)=>(
                <div className='precionar'>
                    <div className="titulo1">{pregunta.id}</div>
                    <div className='rellenar'>
                        {Libro.tes[i].title.map((title)=>(
                            <div>
                                <Bot></Bot>
                                {title}
                            </div>     
                        ))}
                    </div>
                </div>   
            ))}
        </div>
    )
}