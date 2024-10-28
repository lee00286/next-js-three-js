/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      xxl: { max: '1440px' },
      xl: { max: '1280px' },
      lg: { max: '1024px' },
      xxmd: { max: '960px' },
      xmd: { max: '854px' },
      md: { max: '768px' },
      xsm: { max: '640px' },
      sm: { max: '480px' },
      xs: { max: '375px' },
      xxs: { max: '310px' }
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      }
    }
  },
  plugins: []
};
