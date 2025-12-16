/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#141414',
        surface: '#1F1F1F',
        primary: '#E50914', // Netflix Red-ish
        text: {
            main: '#FFFFFF',
            secondary: '#B3B3B3'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
