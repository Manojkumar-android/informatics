/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dim': 'rgba(0, 0, 0, 0.5)', // Define a custom color for the dim effect
      },
      // Define custom label styles
      typography: {
        label: {

          color: 'text-gray-500', // You can adjust the font size as needed
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Add Roboto font
      },
      screens: {
        '2xs': '360px',
        'xs': '480px',
      },

      colors: {
        primary: {
          "DEFAULT": "rgba(58, 15, 111, 1)",
          "opacity-80": "rgba(58, 15, 111,  0.8)",
          "opacity-60": "rgba(58, 15, 111,  0.6)",
          "opacity-30": "rgba(58, 15, 111,  0.3)",
          "opacity-20": "rgba(58, 15, 111, 0.2)",
          "opacity-10": "rgba(58, 15, 111, 0.1)",
        },
        secondary: {
          "DEFAULT": "rgba(189, 44, 86, 1)",
          "opacity-80": "rgba(189, 44, 86, 0.8)",
          "opacity-60": "rgba(189, 44, 86, 0.6)",
          "opacity-30": "rgba(189, 44, 86, 0.3)",
          "opacity-10": "rgba(189, 44, 86, 0.1)",
        },
        success: {
          "DEFAULT": "rgba(14, 173, 105, 1)",
          "opacity-80": "rgba(14, 173, 105, 0.8)",
          "opacity-60": "rgba(14, 173, 105, 0.6)",
          "opacity-30": "rgba(14, 173, 105, 0.3)",
          "opacity-10": "rgba(14, 173, 105, 0.1)",
        },
        warning: {
          "DEFAULT": "rgba(193, 11, 14, 1)",
          "opacity-80": "rgba(193, 11, 14, 0.8)",
          "opacity-60": "rgba(193, 11, 14, 0.6)",
          "opacity-30": "rgba(193, 11, 14, 0.3)",
          "opacity-10": "rgba(193, 11, 14, 0.1)",
        },
        info: {
          "DEFAULT": "rgba(190, 190, 190, 1)",
          "opacity-80": "rgba(190, 190, 190, 1)",
          "opacity-60": "rgba(190, 190, 190, 1)",
          "opacity-30": "rgba(190, 190, 190, 1)",
          "opacity-10": "rgba(190, 190, 190, 1)",
        },
        "purple-stroke": {
          "DEFAULT": "rgba(217, 207, 251, 1)",
          "opacity-80": "rgba(217, 207, 251, 0.8)",
          "opacity-60": "rgba(217, 207, 251, 0.6)",
          "opacity-30": "rgba(217, 207, 251, 0.3)",
          "opacity-10": "rgba(217, 207, 251, 0.1)",
        },
        white: {
          "DEFAULT": "rgba(255, 255, 255, 1)",
          "opacity-80": "rgba(255, 255, 255, 0.8)",
          "opacity-60": "rgba(255, 255, 255, 0.6)",
          "opacity-30": "rgba(255, 255, 255, 0.3)",
          "opacity-10": "rgba(255, 255, 255, 0.1)",
        },
      },
      boxShadow: {
        default: "0px 4px 6px rgba(0, 0, 0, 0.15)",
        secondary: "0px 6px 6px rgba(0, 0, 0, 0.1)",
        soft: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        thin: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        "btn-primary": "0px 4px 6px rgba(247, 170, 48, 0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
    },
    fontSize: {
      base: "16px",
      subheader: "20px",
      header: "24px",
    },
  },

  corePlugins: {
    preflight: false,
  },
};
