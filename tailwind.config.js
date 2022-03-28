module.exports = {
  content: ["./source/**/*.{html,js,erb}"],
  // safelist: [{ pattern: /.*/ }],
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
      'sans': ['Barlow', 'system-ui', 'sans-serif']
    },
    fontSize: {
      xs: "14px",
      sm: "16px",
      md: "20px",
      lg: "24px",
      xl: "32px",
      "2xl": "36px",
      "3xl": "48px",
      "4xl": "56px",
    },
    lineHeight: {
      xs: "20px",
      sm: "22px",
      md: "24px",
      lg: "28px",
      xl: "32px",
      "2xl": "38px",
      "3xl": "40px",
      "4xl": "50px",
      "5xl": "54px",
      "6xl": "60px",
    }
  }
};
