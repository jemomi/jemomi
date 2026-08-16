/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    './app/**/*.{vue,js,ts}',
    './shared/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {}
      }
    },
  },
  plugins: [],
}

