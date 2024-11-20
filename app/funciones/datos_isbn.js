
export const isbndatos = async (isbn) => {
  try {
    const respuesta = await fetch(`/api/libro?isbn=${isbn}`);
    
    if (respuesta.ok) {
      const datos = await respuesta.json();
      console.log(datos);
      const books = datos?.records;

      // Aquí se maneja el error si books es undefined o null
      if (!books) {
        throw new Error("Books is undefined or null");
      }
      
      const aux = Object.keys(books)[0];
      const libro = books[aux].data;
      console.log(libro);
      
      if (libro) {
        return {
          titulo: libro.title || "",
          autor: libro.authors?.[0]?.name || "",
          imagen: libro.cover?.medium || ""
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error en la obtención de datos:", error.message);
    console.log("Se envian  los datos en null");
    return {
      
      titulo: null,
      autor: null,
      imagen: null
    };
    
    
  }
};

