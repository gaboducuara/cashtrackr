/**@type {import('tailwindcss').Config}*/
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth": "url('/grafico.svg')"
      },
      backgroundSize: {
        '30': '30rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}