/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Critical for the dark mode toggle
  theme: {
    extend: {},
  },
  plugins: [],
};