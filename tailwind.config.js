module.exports = {
  content: ["./source/**/*.{html,js,erb}"],
  safelist: [{ pattern: /.*/ }], // uncomment to disable purging
  theme: {
    colors: {
      red: {
        100: "#fff0f0",
        500: "#ff3333",
        900: "#c20a0a",
      },
      gray: {
        100: "#f5f5f5",
        300: "#d4d4d4",
        500: "#656565",
      },
      white: "#fff",
      black: "#000",
      transparent: "transparent",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "4rem",
        xl: "8rem",
      },
    },
    fontFamily: {
      sans: ["Barlow", "system-ui", "sans-serif"],
    },
    extend: {
      keyframes: {
        fadeIn: {
          to: { opacity: 1, transform: "rotate(180deg)" },
        },
        fadeOut: {
          to: { opacity: 0, transform: "rotate(180deg)" },
        },
        slideX: {
          to: { transform: "translateX(var(--translate-x))" },
        },
        slideY: {
          // percetages will vary based on the amount of items
          "0%": { opacity: 0, transform: "translate3d(0, calc(100% - (100% * var(--translate-ix))), 0)" },
          "2%": { opacity: 1, transform: "translate3d(0, calc(-100% * var(--translate-ix)), 0)" },
          "8%": { opacity: 1, transform: "translate3d(0, calc(-100% * var(--translate-ix)), 0)" },
          "10%": { opacity: 0, transform: "translate3d(0, calc(-100% - (100% * var(--translate-ix))), 0)" },
          "100%": { opacity: 0, transform: "translate3d(0, calc(-100% - (100% * var(--translate-ix))), 0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out forwards",
        "fade-out": "fadeOut 0.3s ease-in-out forwards",
        "slide-x": "slideX 15s linear infinite",
        // duration will vary based on the amount of items
        "slide-y": "slideY 18s cubic-bezier(.19,1,.22,1) calc(2s * var(--translate-ix)) infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
