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
      transparent: "transparent"
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "4rem",
        xl: "8rem"
      },
    },
    fontFamily: {
      "sans": ["Barlow", "system-ui", "sans-serif"]
    },
    extend: {
      keyframes: {
        fadeIn: {
          to: { opacity: "100%", transform: "rotate(180deg)" },
        },
        fadeOut: {
          to: { opacity: "0%", transform: "rotate(180deg)" },
        },
        slide: {
          to: { transform: "translate3d(var(--translate-slide), 0, 0)" },
        }
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out forwards",
        "fade-out": "fadeOut 0.3s ease-in-out forwards",
        "slide": "slide 10s linear infinite"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};