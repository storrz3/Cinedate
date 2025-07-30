/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#E9D5FF', // Light purple
          200: '#D8B4FE', // Medium light purple
          300: '#C084FC', // Medium purple
          400: '#A855F7', // Medium dark purple
          500: '#9333EA', // Dark purple
          600: '#7E22CE', // Darker purple
          700: '#6B21A8', // Very dark purple
        },
      },
      fontFamily: {
        'sans': ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

