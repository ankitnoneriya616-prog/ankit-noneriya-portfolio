/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0B',
        charcoal: '#141416',
        charcoal2: '#1C1C1F',
        bone: '#F5F3EF',
        mist: '#A8A6A2',
        brass: '#C9A876',
        brassDim: '#8C7550',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
