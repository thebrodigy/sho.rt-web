/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        volt: { DEFAULT: '#CAFF00', dark: '#AEDD00' },
        ink: { 50: '#F5F5F0', 100: '#EAEAE3', 200: '#D4D4C8', 900: '#0F0F0D', 800: '#1C1C18', 700: '#2E2E28', 600: '#525249' },
      },
      animation: {
        'fade-up': 'fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'pop-in': 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        popIn: { from: { opacity: '0', transform: 'scale(0.92)' }, to: { opacity: '1', transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
