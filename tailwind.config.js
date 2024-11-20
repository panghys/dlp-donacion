/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #121219 10%, #6063a4 100%)', //Gradiente del fondo
        'primary-gradient': 'linear-gradient(90deg, #75a8ff 30%, #b8d9ff)', //Gradiente de los botones
        'gradient-hover': 'linear-gradient(90deg, #75a8ff 60%, #b8d9ff)', //Gradiente hover de los botones
      },
      fontFamily: {
        sans: ['Kanit', 'sans-serif'], //Fuente de texto Kanit
      },
      colors: {
        customDark: '#2a2b3e', //Color Fondo SÃ³lido
        customBlue: '#b8d9ff', //Bordes de los botones
        customGray: '#2f4668', //Color texto botones
      },
    },
  },
  plugins: [],
}