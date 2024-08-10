/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      height:{
        "1/10":"10%",
        "9/10":"90%",
        "8/10":"80%"
      }
    },
  },
  plugins: [],
}

