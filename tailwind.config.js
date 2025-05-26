/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // adjust if you're not using these file types
  ],
  theme: {
    extend: {
      colors: {
        'secondary-bg': 'var(--secondarybg)', // your custom color variable
      },
    },
  },
  plugins: [],
};
