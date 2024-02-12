module.exports = {
  mode: "jit",
  safelist: ["bg-white", "bg-primary-1", "bg-highlight-tint", "bg-gray-light", "bg-secondary-1"],
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Lato, sans-serif",
      secondary: "Playfair Display, serif",
    },
    fontSize: {
      sm: [".875rem", "1.3125rem"], // 14px, 21px
      base: ["1rem", "1.625rem"], // 16px, 26px
      m1: ["1.125rem", "1.5rem"], // 18px, 24px
      m2: ["1.25rem", "1.5rem"], // 20px, 24px
      l1: ["1.5625rem", "2.1875rem"], // 25px, 35px
      l2: ["1.875rem", "2.1875rem"], // 30px, 35px
      xl1: ["2.5rem", "2.8125rem"], // 40px, 45px
      xl2: ["3.125rem", "3.75rem"], // 50px, 60px
    },
    colors: {
      primary: {
        1: "#003366",
        2: "#011F3E",
      },
      secondary: {
        1: "#666699",
        2: "#E0E0EB",
      },
      tertiary: {
        1: "#EC871B",
        2: "#FBE7D1",
      },
      danger: "#F0A7C3",
      caution: "#EC871B",
      valid: "#666699",
      gray: {
        charcoal: "#444444",
        DEFAULT: "#EAEAEA",
        light: "#F7F7F7",
      },
      white: "#ffffff",
    },
    extend: {
      backgroundImage: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
