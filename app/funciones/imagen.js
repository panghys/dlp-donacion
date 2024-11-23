export async function Base64(imagenUrl) {
    try {
        if (!imagenUrl || typeof imagenUrl !== "string") {
            throw new Error("URL INVÁLIDA");
        }
        const response = await fetch(imagenUrl);
        if (!response.ok) {
            throw new Error("Error al conseguir la imagen, ver estado: " + response.status);
        }
        const blob = await response.blob();

        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("Error al leer como base64");
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Error al convertir a base64", error);
        return null;
    }
}

export default Base64;
