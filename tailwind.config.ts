import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          50: '#f0f4f9',
          100: '#dce6f2',
          200: '#b8cce5',
          300: '#8aaed4',
          400: '#5c8fbf',
          500: '#3a72a8',
          600: '#2b5a8c',
          700: '#214671',
          800: '#1e3a5f',
          900: '#152947',
        },
        'trust-green': '#3d8b37',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
