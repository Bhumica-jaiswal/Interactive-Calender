/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        'cal-flip-next': {
          '0%': { opacity: '0.28', transform: 'rotateX(-22deg) translateY(-10px)' },
          '55%': { opacity: '0.9' },
          '100%': { opacity: '1', transform: 'rotateX(0deg) translateY(0)' },
        },
        'cal-flip-prev': {
          '0%': { opacity: '0.28', transform: 'rotateX(22deg) translateY(10px)' },
          '55%': { opacity: '0.9' },
          '100%': { opacity: '1', transform: 'rotateX(0deg) translateY(0)' },
        },
        'cal-enter-fade': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'cal-flip-next':
          'cal-flip-next 340ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'cal-flip-prev':
          'cal-flip-prev 340ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'cal-enter-fade':
          'cal-enter-fade 220ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}

