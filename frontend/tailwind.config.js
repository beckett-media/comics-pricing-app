module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      'background': '#161032',
      'background-light': '#5416e5',
      'field': '#433b64',
      'header': '#fffffe',
      'text': '#bcc5d2',
      'link': '#41d3f3',
      'button': '#5416e5',
    },
    extend: {
      fontFamily: {
        'logo': ['Woodchuck'],
      },
      gridTemplateColumns: {
        'navbar': '1fr 40% 1fr',
      }
    },
  },
  plugins: [],
}
