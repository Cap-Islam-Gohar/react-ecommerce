/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/container-queries'),
  ],
}

