/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#0E61F1',
        darkPrimary: '#2A42AF',
        background: '#F5F9FE'
      },
      gridTemplateColumns: {
        autoFit: 'repeat(auto-fit, minmax(200px, 1fr))',
        mobileAutoFit: 'repeat(auto-fit, minmax(5rem, 1fr))',
        clothes: '2in 1fr',
        payment: '2fr 1fr'
      },
      gridColumn: {
        first: '1 / 2',
        second: '2 / 3'
      },
      gridRow: {
        span: '1 / 3'
      },
      backgroundImage: {
        search: "url('./assets/search.svg')"
      },
      boxShadow: {
        outsideBlueSm: '0px 0px 36px rgba(43, 73, 216, 0.17)',
        outsideBlueMd: '0px 0px 54px rgba(43, 73, 216, 0.17)',
        outsideBlueLg: '0px 0px 72px rgba(43, 73, 216, 0.17)',
        button: '0px 21px 69px rgba(14, 97, 241, 0.5)'
      }
    },
  },
  plugins: [],
}
