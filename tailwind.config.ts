import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        dm: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0D0B09',
        'ink-soft': '#161310',
        cream: '#F0EBE3',
        'cream-dim': '#8A8278',
        gold: '#C9A96E',
        'gold-light': '#DBC08F',
        'gold-deep': '#8A6E3E',
        rule: '#2A2520',
      },
      letterSpacing: {
        widest2: '0.4em',
        widest3: '0.5em',
      },
    },
  },
  plugins: [],
}

export default config
