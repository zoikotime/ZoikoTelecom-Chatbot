const config = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        shell: "rgb(var(--color-shell) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        accentDeep: "rgb(var(--color-accent-deep) / <alpha-value>)",
        bubbleBot: "rgb(var(--color-bubble-bot) / <alpha-value>)",
        bubbleUser: "rgb(var(--color-bubble-user) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
      },
      boxShadow: {
        panel: "var(--shadow-panel)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      backgroundImage: {
        dashboard: "var(--bg-dashboard)",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        bounceSoft: {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.55" },
          "40%": { transform: "translateY(-4px)", opacity: "1" },
        },
      },
      animation: {
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
        bounceSoft: "bounceSoft 1.2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
