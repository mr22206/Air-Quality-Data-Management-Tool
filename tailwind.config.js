/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}', './components/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          100: '#DEF4C6',
          200: '#B1CF5F',
          300: '#73E2A7',
          400: '#1C7C54',
          500: '#1B512D',
        },
      },
    },
  },
  plugins: [],
}
