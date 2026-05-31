/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      colors: {
        accent: '#0A66C2',
        'accent-light': '#1E86D4',
        bg: '#07080F',
        'bg-elevated': '#0C0E1A',
        'bg-card': '#0F1120',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(10,102,194,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(10,102,194,0.6)' },
        },
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
        'slide-in': 'slide-in 0.5s ease forwards',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
