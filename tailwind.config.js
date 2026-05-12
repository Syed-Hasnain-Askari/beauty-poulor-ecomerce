/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#faf3ee',
        'on-background': '#1c1b1b',
        surface: '#faf3ee',
        'on-surface': '#1a1a1a',
        'surface-variant': '#e5e2e1',
        'on-surface-variant': '#544245',
        primary: '#c8637a',
        'on-primary': '#ffffff',
        secondary: '#c9a84c',
        'on-secondary': '#000000',
        'matte-black': '#1a1a1a',
        'warm-cream': '#faf3ee',
        gold: '#c9a84c',
        'deep-rose': '#c8637a',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
      },
      spacing: {
        'margin-mobile': '20px',
        'margin-desktop': '64px',
        'stack-sm': '8px',
        'stack-md': '24px',
        'stack-lg': '48px',
        'section-gap': '80px',
        'gutter': '24px',
      },
    },
  },
  plugins: [],
}
