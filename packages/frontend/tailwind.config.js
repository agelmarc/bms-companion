module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "var(--color-text-primary)",
            header: {
              textAlign: "center",
              marginTop: "10rem !important",
              marginBottom: "10rem !important",
              h1: {
                margin: "0",
              },
            },
            h1: {
              fontSize: "var(--text-size-xxl)",
              color: "var(--color-text-primary)",
            },
            h2: {
              fontSize: "var(--text-size-l)",
              color: "var(--color-text-primary)",
            },
            strong: {
              color: "var(--color-text-primary)",
            },
            a: {
              color: "var(--color-text-standout)",
              textDecoration: "none",
              transition: "color var(--timimg-snappy) ease",
              "&:hover": {
                color: "var(--color-accent)",
              },
            },
            ol: {
              li: {
                "&::before": {
                  fontWeight: 700,
                  color: "var(--color-text-secondary)",
                },
              },
              l: {
                color: "#6b7280",
                fontWeight: 700,
                marginRight: ".125rem",
              },
            },
            ul: {
              li: {
                margin: "0",
                "&::before": {
                  color: "var(--color-text-secondary)",
                },
              },
            },
            thead: {
              color: "var(--color-text-primary)",
            },
          },
        },
      },
      colors: {
        accent: "var(--color-accent)",
        "accent-dark": "var(--color-accent-dark)",
        "accent-light": "var(--color-accent-light)",
        blue: "var(--color-blue)",
        salmon: "var(--color-salmon)",
        "grey-0": "var(--color-grey-0)",
        "grey-1": "var(--color-grey-1)",
        "grey-2": "var(--color-grey-2)",
        "grey-3": "var(--color-grey-3)",
        "grey-4": "var(--color-grey-4)",
        "blue-dark-0": "var(--color-blue-dark-0)",
        "blue-dark-1": "var(--color-blue-dark-1)",
        "blue-dark-2": "var(--color-blue-dark-2)",
        "blue-light-0": "var(--color-blue-light-0)",
        "blue-light-1": "var(--color-blue-light-1)",
      },
      maxWidth: {
        "8xl": "1920px",
      },
      boxShadow: {
        magical:
          "rgba(0, 0, 0, 0.05) 0px 0px 10px, rgba(0, 0, 0, 0.1) 0px 0px 3px",
      },
      transitionProperty: {
        brightness: "filter",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
