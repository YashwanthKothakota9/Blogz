import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        apple: {
          50: '#f1fcf1',
          100: '#e0f8e0',
          200: '#c2f0c2',
          300: '#92e393',
          400: '#5bcd5d',
          500: '#32a934',
          600: '#269328',
          700: '#217423',
          800: '#1f5c21',
          900: '#1b4c1d',
          950: '#0a290c',
        },
      },
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};
