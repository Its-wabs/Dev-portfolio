/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       fontFamily: {
        zen: ["zen", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
         colors: {
          


  goldenbronze: {
    "50": "#faf6ea",
    "100": "#f5edd6",
    "200": "#ebdbad",
    "300": "#e1c884",
    "400": "#d7b65b",
    "500": "#cda432",
    "600": "#a48328",
    "700": "#7b621e",
    "800": "#524214",
    "900": "#29210a",
    "950": "#1d1707"
  },



        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        violet: {
          300: "#5724ff",
        },
        yellow: {
          100: "#8e983f",
          300: "#edff66",
        },
      },
    },
  },
  plugins: [],
}

