/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  darkMode: 'class',
  theme: {
    // Mobile first: base = phone, sm = tablet, md = desktop
    screens: {
      sm: '641px',
      md: '961px'
    },
    extend: {
      // Colours come from CSS variables (css/input.css) so light and dark themes share the same classes
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        blue: { DEFAULT: 'rgb(var(--blue) / <alpha-value>)', soft: 'rgb(var(--blue-soft) / <alpha-value>)' },
        night: {
          DEFAULT: 'rgb(var(--night) / <alpha-value>)',
          line: 'rgb(var(--night-line) / <alpha-value>)',
          muted: 'rgb(var(--night-muted) / <alpha-value>)'
        }
      },
      fontFamily: {
        sans: ['Geist', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'Consolas', 'monospace']
      },
      maxWidth: { wrap: '1280px' }
    }
  }
};
