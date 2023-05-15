// import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {},
        colors: {
            ...colors,
            "off-white": "#FDFDFF",
            "primary-black": "#121212",
            "secondary-black": "#14171A",
            // "secondary-black": "#242424",
            // "secondary-black": "#101112",
            "brand-gray": "#657786",
            "primary-link": "#0070f3",
            "secondary-link": "#0A66C2",
            primary: colors.teal,
        },
    },
    plugins: [],
};
