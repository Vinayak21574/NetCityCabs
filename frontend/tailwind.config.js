/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors:{
            "dark":"#081A51",
            "dark_":"#dce2f5",
            "light":"rgb(255,255,255,0.18)",
            // "hover":
        },
        spacing: {
            '60': '15rem',
            '72': '18rem',
            '76': '21rem',
            '84': '21rem',
            '96': '24rem',
            '108': '27rem',
            '120': '30rem',
            '132': '32rem',
            '144': '36rem',
            '156': '39rem',
            '168': '42rem',
            '180': '45rem',
            '192': '48rem',
            '200': '50rem',
            '204': '51rem',
            '240': '60rem',
            '252': '63rem',
            '288': '72rem',
            '324': '81rem',
          }
      },
    },
    plugins: [],
  }