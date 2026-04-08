/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        'cal-enter-left': {
          from: { opacity: '0', transform: 'translateX(-0.65rem)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'cal-enter-right': {
          from: { opacity: '0', transform: 'translateX(0.65rem)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'cal-enter-fade': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'cal-enter-left':
          'cal-enter-left 280ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'cal-enter-right':
          'cal-enter-right 280ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'cal-enter-fade':
          'cal-enter-fade 220ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}

