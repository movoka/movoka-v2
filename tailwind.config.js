/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        movoka: {
          black: '#050505',
          carbon: '#0B0D0A',
          titanium: '#1B1E19',
          kiwi: '#C6FF00',
          lime: '#B9FF28',
          white: '#F5F5F0',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
      },
    },
  },
  plugins: [],
};
