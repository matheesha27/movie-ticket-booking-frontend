/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        primary: "#121212",
        secondary: "#f3ae0c",
        accent: "#8A2BE2",
        text: "#b6b4b4",

      },

    },
  },

  plugins: [],
}