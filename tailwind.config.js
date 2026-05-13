/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0ff',
          100: '#ede5ff',
          500: '#7c3aed',
          600: '#6B21E8',
          700: '#5b18d0',
          900: '#2e0a7a',
        },
        dark: '#0f0f0f',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        'btn': '8px',
      },
    },
  },
  plugins: [],
}