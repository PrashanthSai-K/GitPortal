/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        colors: {
            "side-blue" : "#0F3B99"
        },
        height : {
          "88" : "22rem"
        }
    },
  },
  plugins: [],
}
