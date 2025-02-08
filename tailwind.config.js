/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto-Regular', 'sans-serif'],
        serif: ['Cooper', 'serif'],
      },
    },
  },
}
