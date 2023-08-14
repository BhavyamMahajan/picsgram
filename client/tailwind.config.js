/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "rgb(0,149,246)",
        blue_hover: "rgb(24, 119, 242)",
      },
      screens: {
        sm: { max: "640px" },
        md: "420px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        zoomIn: "zoomIn .45s ease-in-out",
      },
      keyframes: {
        zoomIn: {
          "0%": { transform: "scaleY(1)" },
          "25%": { transform: "scaleY(1.2)" },
          "50%": { transform: "scaleY(.95)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};
