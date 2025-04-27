/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A21C0',
        secondary: '#050A44',
        background: {
          main: '#FFFFFF',
          paper: '#141619',
          dark: '#2C2E3A',
        },
        text: {
          primary: '#141619',
          secondary: '#2C2E3A',
          muted: '#B3B4BD',
        },
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        secondary: ['Montserrat', 'sans-serif'],
        tertiary: ['Nunito', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '13px',
        'base': '14px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      transitionProperty: {
        'default': 'all',
      },
      transitionDuration: {
        'default': '300ms',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}



