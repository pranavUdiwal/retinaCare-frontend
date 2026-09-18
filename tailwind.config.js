/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070a13',
          900: '#0f1423',
          800: '#1a233a',
          700: '#2a3754',
          600: '#3a4c73',
          500: '#4a6192',
          400: '#7588b0',
          300: '#a1b1cc',
          200: '#ccd9ea',
          100: '#eef3f8',
        },
        paper: {
          50: '#faf9f7',
          100: '#f5f4ef',
          200: '#e6e3d9',
          300: '#d5cfc1',
          400: '#c2b8a6',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
