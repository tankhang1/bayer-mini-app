// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        helveticaneue: ["helveticaneue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
