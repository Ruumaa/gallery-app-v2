/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#080C0A',

          secondary: '#8A8994',

          accent: '#C8D3D5',

          neutral: '#2E4052',

          'base-100': '#FCFAFA',

          info: '#666CA3',

          success: '#04724D',

          warning: '#EAC435',

          error: '#FB3523',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
