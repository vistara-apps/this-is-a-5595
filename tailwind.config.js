/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220 15% 95%)',
        surface: 'hsl(0 0% 100%)',
        primary: 'hsl(220 80% 45%)',
        accent: 'hsl(160 70% 40%)',
        error: 'hsl(0 70% 50%)',
        'text-primary': 'hsl(225 10% 20%)',
        'text-secondary': 'hsl(220 10% 40%)',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(220, 10%, 10%, 0.12)',
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.22,1,0.36,1) infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': {
            transform: 'scale(0.33)',
            opacity: '1',
          },
          '80%, 100%': {
            transform: 'scale(2.4)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}