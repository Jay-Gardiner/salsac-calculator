module.exports = {
  important: true,
  content: [
    './src/**/*.{html,vue,js,jsx,ts,css}'
  ],
  media: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    neumorphismColor: {
      black: {
        100: '#272626'
      }
    },
    extend: {
      boxShadow: {
        'neu': '22px 22px 44px #1e1d1d, -22px -22px 44px #302f2f'
      },
      colors: {
        'neu': '#272626'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-neumorphism')
  ],
}
