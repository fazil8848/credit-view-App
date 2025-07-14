/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./App.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["RobotoRegular"],
        "roboto-bold": ["RobotoBold"],
        "roboto-extra-bold": ["RobotoExtraBold"],
      },
      colors: {
        "white-10": "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
