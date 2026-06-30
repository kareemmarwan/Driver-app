/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EF2B2D",
        "primary-dark": "#C91F26",
        "primary-light": "#FFF0F0",
        black: "#111111",
        "dark-gray": "#2B2B2B",
        background: "#FFFFFF",
        surface: "#F8F8F8",
        border: "#F0F0F0",
        "text-primary": "#111111",
        "text-secondary": "#666666",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#DC2626",
        disabled: "#BDBDBD",
        "tab-inactive": "#999999",
        "switch-off": "#CCCCCC",
        placeholder: "#999999",
      },
      spacing: {
        "3xl": "64px",
        lg: "24px",
        base: "4px",
        "2xl": "48px",
        "margin-mobile": "16px",
        xs: "4px",
        md: "16px",
        sm: "8px",
        gutter: "16px",
        "margin-desktop": "32px",
        xl: "32px",
      },
      fontFamily: {
        cairo: ["Cairo", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
