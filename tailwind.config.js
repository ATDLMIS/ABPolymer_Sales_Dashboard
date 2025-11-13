/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["selector", "class"],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary1: '#6C5DD3',
        primary1: '#FF6F0B',
        bgIcon:"#3498DB",
        secendory: 'linear-gradient(94.95deg, #6C5DD3 -23.78%, #4C3F9C 98.47%)',
        surface1: '#ffffff',
        surface2: '#F6F7F9',
        text1: '#1B1A1A',
        text2: '#666666',
      },
      backgroundImage: {
        'hero-image': "url('/images/hero-bg.png')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
