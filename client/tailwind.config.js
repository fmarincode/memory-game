/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        '4xl-green': '0px 0px 25px 10px #A6CF98',
        '4xl-red': '0px 0px 25px 10px #BE3144'
      },
      
    },
  },
  plugins: [],
}