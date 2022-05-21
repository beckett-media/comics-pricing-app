module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "nav-bar": "#0C0822",
        "search-bar": "#343141",
        "search-text": "#0C0822",
        "search-button-start": "#C3FAE4",
        "search-button-stop": "#6CD7D4",
      },
      gridTemplateColumns: {
        navbar: "1fr 40% 1fr",
      },
    },
  },
  plugins: [],
}
