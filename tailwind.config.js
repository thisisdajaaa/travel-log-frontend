/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }

    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Gotham", "sans-serif"],
        secondary: ["Inter", ...fontFamily.sans],
        tertiary: ["Open Sans", ...fontFamily.sans],
      },
      colors: {
        nero: withOpacityValue("--tw-color-nero"),
        improbable: withOpacityValue("--tw-color-improbable"),
        adirondack: withOpacityValue("--tw-color-adirondack"),
        beluga: withOpacityValue("--tw-color-beluga"),
        maculataBark: withOpacityValue("--tw-color-maculata-bark"),
        belcherMetal: withOpacityValue("--tw-color-belcher-metal"),
        platinumGrey: withOpacityValue("--tw-color-platinum-grey"),
        poppySurprise: withOpacityValue("--tw-color-poppy-surprise"),
        icicles: withOpacityValue("--tw-color-icicles"),
        polarDrift: withOpacityValue("--tw-color-polar-drift"),
        shishaCoal: withOpacityValue("--tw-color-shisha-coal"),
        blackOut: withOpacityValue("--tw-color-black-out"),
        superSilver: withOpacityValue("--tw-color-super-silver"),
        silverback: withOpacityValue("--tw-color-silverback"),
        disable: withOpacityValue("--tw-color-disable"),
        whiteSmoke: withOpacityValue("--tw-color-white-smoke"),
        whisper: withOpacityValue("--tw-color-whisper"),
        aliceBlue: withOpacityValue("--tw-color-alice-blue"),
        azure: withOpacityValue("--tw-color-azure"),
        ebonyClay: withOpacityValue("--tw-color-ebony-clay"),
        cloudBurst: withOpacityValue("--tw-color-cloud-burst"),
        rustOleum: withOpacityValue("--tw-color-rust-oleum"),
        dodgerBlue: withOpacityValue("--tw-color-dodger-blue"),
        white: withOpacityValue("--tw-color-white"),
        greyChateau: withOpacityValue("--tw-color-grey-chateau"),
        darkJungleGreen: withOpacityValue("--tw-color-dark-jungle-green"),
        zircon: withOpacityValue("--tw-color-zircon"),
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
    require("daisyui"),
  ],
  darkMode: "",
  daisyui: {
    themes: ["emerald"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "emerald", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
