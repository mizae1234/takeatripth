import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcD4ff',
          300: '#8ebbff',
          400: '#5996ff',
          500: '#1e3a5f',
          600: '#1a3354',
          700: '#162c49',
          800: '#12253e',
          900: '#0e1e33',
        },
        accent: {
          50: '#fff4f1',
          100: '#ffe6df',
          200: '#ffd0c4',
          300: '#ffad99',
          400: '#ff8566',
          500: '#ff6b4a',
          600: '#e85a3a',
          700: '#c4472d',
          800: '#a03a25',
          900: '#7c2e1e',
        },
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        sand: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
        },
      },
      fontFamily: {
        sans: ['Prompt', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 50%, #ff6b4a 100%)',
        'card-gradient': 'linear-gradient(135deg, #f0f9ff 0%, #fefce8 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.15)',
        'button': '0 4px 15px rgba(255, 107, 74, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
