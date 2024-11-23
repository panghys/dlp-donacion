import Base64 from "./imagen";
export const isbndatos = async (isbn) => {
  try {
    const respuesta = await fetch(`/api/libro?isbn=${isbn}`);
    
    if (respuesta.ok) {
      const datos = await respuesta.json();
      const testlibros = datos?.records;

      if (!testlibros) {
        throw new Error("libro nulo");
      }
      
      const aux = Object.keys(testlibros)[0];
      const libro = testlibros[aux].data;
      
      if (libro) {
        const titulo = libro.title || "";
        const autor = libro.authors?.[0]?.name || "";
        const imagenUrl = libro.cover?.medium;
        let imagenBase64 = null;

        if (imagenUrl) {
          imagenBase64 = await Base64(imagenUrl);
          console.log(imagenBase64) // para probar si pesca (NO SIEMPRE LOS ISBN VIENEN CON COVER)
        }

        return {
          titulo,
          autor,
          imagen: imagenBase64, // por ahora probando no me dio error si es que no tiene cover-, 
                                //-pero si al pasar a la api tiene errores entonces pongamos otros ifs
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error en la obtención de datos:", error.message);
    return {
      titulo: null,
      autor: null,
      imagen: null,
    };
  }
};