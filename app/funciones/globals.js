
let isbnG = "";  // Definimos la variable global con `let`

// Función para actualizar el valor del isbnGlobal
export const setIsbn = (isbn) => {
  isbnG = isbn;  // Asignamos el nuevo valor de ISBN
};

// Función para obtener el valor actual del isbnGlobal
export const getIsbn = () => {
  return isbnG;  // Devolvemos el valor actual del ISBN
};