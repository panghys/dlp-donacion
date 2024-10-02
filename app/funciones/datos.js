"use client";
import formulario from "@/app/formulario/donador.json"
import Cuadro from "@/app/funciones/ctexto.js"
import Bot from "@/app/funciones/checkbox.js"
import Libro from "@/app/formulario/libro.json"
export function persona() {
    return (
      <div>
        {formulario.cuadrotx.map((preg, i) => (
          <div className='rellenar' key={i}>
            <div className='tex'>{preg}</div>
            <Cuadro />
          </div>
        ))}
  
        {formulario.tes.map((pregunta, i) => (
          <div className='precionar' key={i}>
            <div className="titulo1">{pregunta.pregunta}</div> {/* Mostrar la pregunta */}
            <div className='rellenar'>
              {pregunta.opciones.map((opcion, j) => (
                <label key={j}>
                  <input type={pregunta.tipo} name={pregunta.id} value={opcion} />
                  {opcion}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
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