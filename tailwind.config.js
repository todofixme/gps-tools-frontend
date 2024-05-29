/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto-Regular', 'sans-serif'],
        serif: ['Cooper', 'serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          '.bg-navbar': {
            'background-color': '#06D26A' /* For browsers that do not support gradients */,
            'background-image': 'linear-gradient(to right, #06D26A , #00918C)',
          },
          '.text-base-content': {
            color: '#EAEAEA',
          },
          '.highlight-color': {
            color: '#06D26A',
          },
          'background-color': '#202936',
        },
      },
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          '.bg-navbar': {
            'background-color': '#FF3E3E' /* For browsers that do not support gradients */,
            'background-image': 'linear-gradient(to right, #FF3E3E , #FFA400)',
          },
          '.text-base-content': {
            color: '#474F5A',
          },
          '.highlight-color': {
            color: '#FF3E3E',
          },
          'background-color': 'white',
        },
      },
    ],
  },
}
