import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enables dark mode via class

  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom background color variable
        foreground: "var(--foreground)", // Custom foreground color variable
      },
      fontFamily: {
        Poppins: ["var(--font-Poppins)", "sans-serif"],
        Josefin: ["var(--font-Josefin)", "sans-serif"],
        Signature: ["var(--font-Satisfy)", "cursive"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))', // Custom radial gradient
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%,var(--tw-gradient-stops))', // Custom conic gradient
      },
      screens: {
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1300px": "1300px",
        "1500px": "1500px",
        "800px": "800px",
        "400px": "400px",
      },
    },
  },
  fontFamily: {
    Josefin: ['"Josefin Sans"', 'sans-serif','font-Signature'],
  },
  
  plugins: [],
};

export default config;
