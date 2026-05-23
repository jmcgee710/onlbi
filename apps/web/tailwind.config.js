/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#eff9ff',
          100: '#dff2ff',
          200: '#b8e8ff',
          300: '#7ad7ff',
          400: '#35c2fd',
          500: '#0babee',
          600: '#0088cc',
          700: '#016da6',
          800: '#065d89',
          900: '#0b4e71',
        },
        sand: {
          50: '#fdf9f0',
          100: '#faf0d9',
          200: '#f4ddb0',
          300: '#ecc57e',
          400: '#e3a94b',
          500: '#da8f2a',
          600: '#c17320',
          700: '#a05a1c',
          800: '#82491e',
          900: '#6c3d1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
