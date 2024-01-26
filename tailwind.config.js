/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './assets/**/*.{js,ts,jsx,tsx}',
    './scripts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        tanoi: {
          DEFAULT: '#FFD15B',
          50: '#FFFFFF',
          100: '#FFFFFE',
          200: '#FFF3D5',
          300: '#FFE8AD',
          400: '#FFDC84',
          500: '#FFD15B',
          600: '#FFC123',
          700: '#EAA800',
          800: '#B28000',
          900: '#7A5700',
          950: '#5E4300'
        },
        boulder: {
          DEFAULT: '#7A7A7A',
          50: '#D6D6D6',
          100: '#CCCCCC',
          200: '#B7B7B7',
          300: '#A3A3A3',
          400: '#8E8E8E',
          500: '#7A7A7A',
          600: '#5E5E5E',
          700: '#424242',
          800: '#262626',
          900: '#0A0A0A',
          950: '#000000'
        },
        silver: {
          DEFAULT: '#C6C6C6',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#EFEFEF',
          400: '#DADADA',
          500: '#C6C6C6',
          600: '#AAAAAA',
          700: '#8E8E8E',
          800: '#727272',
          900: '#565656',
          950: '#484848'
        }
      },
      backgroundImage: {
        'hero-pattern': 'url(\'./assets/medias/hero-bg.avif\')'
      },
      fontFamily: {
        anton: ['anton', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif']
      }
    }
  },
  plugins: []
};
