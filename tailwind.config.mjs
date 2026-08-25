export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Near-black canvas pulled from the client's flyer artwork
        ink: {
          950: '#0a0a0b',
          900: '#121214',
          800: '#1c1c1f',
          700: '#2a2a2e',
          600: '#3a3a40',
        },
        // Primary gold/yellow accent (headline text, prices, CTAs)
        gold: {
          200: '#fbeec1',
          300: '#f6de9b',
          400: '#efc23c',
          500: '#e6b122',
          600: '#c99412',
          700: '#a67810',
        },
        // Tomato-sauce red secondary accent
        sauce: {
          400: '#e2604b',
          500: '#c8402c',
          600: '#a83220',
          700: '#841f11',
        },
        // Warm cream for light text blocks / card surfaces on dark bg
        cream: {
          50: '#faf6ee',
          100: '#f4ead6',
          200: '#ecdcb8',
        },
      },
      fontFamily: {
        // Bold condensed poster face, matches the flyer headline treatment
        display: ['"Anton"', 'Impact', 'sans-serif'],
        // Casual script accent, matches the hand-lettered "Gustos" flourish
        script: ['"Caveat"', 'cursive'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        gingham:
          'repeating-linear-gradient(45deg, rgba(200,64,44,0.08) 0, rgba(200,64,44,0.08) 12px, transparent 12px, transparent 24px), repeating-linear-gradient(-45deg, rgba(200,64,44,0.08) 0, rgba(200,64,44,0.08) 12px, transparent 12px, transparent 24px)',
      },
    },
  },
  plugins: [],
};
