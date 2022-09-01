/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#E8E0D5',
        darkPrimary: '#E0AFA0'
      },
      gridTemplateColumns: {
        autoFit: 'repeat(auto-fit, minmax(280px, 1fr))',
        mobileAutoFit: 'repeat(auto-fit, minmax(5rem, 1fr))',
        clothes: '1.5in 1fr'
      }
    },
  },
  plugins: [],
}
