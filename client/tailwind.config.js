/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E85D56",
        card: {
          bg: "rgba(0,0,0,0.15)",
          bglight:"rgba(245,233,221,0.40)"
        },
        background: {
          light: "#F5E9DD",
          dark: "#494949",
        },
        color: {
          light: "#494949",
          dark: "#F5E9DD",
        },
        bg: {
          customBg:'#F5E9DD'
        }
      },
    },
  },
  plugins: [],
};
