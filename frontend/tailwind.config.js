module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    // Add other file paths if necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
