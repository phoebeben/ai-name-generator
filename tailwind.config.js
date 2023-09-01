/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  content: [
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*',
    ],
  theme: {
    extend: {
      colors: {
        my_color: '#4dcb7a',
      }
    },
  },
  plugins: [],
}
