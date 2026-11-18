/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Clash Display', 'Syne', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          950: '#050507',
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1c1c28',
          600: '#2a2a3a',
          500: '#3a3a4e',
        },
        liquid: {
          50: '#e6f7ff',
          100: '#c2ecff',
          200: '#8eddff',
          300: '#54ccff',
          400: '#22b8ff',
          500: '#00a3f5',
          600: '#0086d6',
          700: '#006aad',
          800: '#00548a',
          900: '#003e66',
        },
        coral: {
          400: '#ff6b6b',
          500: '#ff4d6d',
          600: '#e6336b',
        },
        mint: {
          400: '#4ade80',
          500: '#22c55e',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'liquid-rise': 'liquidRise 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'spin-slow': 'spin 20s linear infinite',
        'blob': 'blob 12s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        liquidRise: {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%' },
          '34%': { borderRadius: '70% 30% 46% 54% / 30% 60% 40% 70%' },
          '67%': { borderRadius: '30% 60% 70% 40% / 50% 30% 70% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
