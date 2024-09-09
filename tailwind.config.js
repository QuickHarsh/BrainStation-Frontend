// tailwind.config.js
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const darkMode = "class";
export const theme = {
  extend: {
    fontFamily: {
      "josfin-sans": ["Josefin Sans", ...defaultTheme.fontFamily.sans],
      "jura": ["Jura", ...defaultTheme.fontFamily.sans],
      "inter": ["Inter", ...defaultTheme.fontFamily.sans]
    },
    colors: {
      primary: {
        "white": "#FEFEFE",
        "black": "#000000",
        "red": "#FE0000",
        "blue": "#0B54A0",
        "green": "#02AB31",
        "paper": "#FDF5EA",
        "gray": "#E0E5E6",
        "gray-light": "#F1F1F1"
      }
    },
    backgroundImage: {
      "horizontal-gradient": "linear-gradient(to right, #0B54A0, #074690, #002E74)"
    }
  }
};
export const plugins = [require("@tailwindcss/typography")];
