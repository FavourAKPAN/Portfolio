import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        soft: "var(--soft)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        body: "var(--body)",
        surf: "var(--surf)",
        line: "var(--line)",
        rule: "var(--rule)",
        accent: "var(--accent-text)",
        brand: "#B76BFF",
        "brand-fill": "#7A1FD1",
        panel: "#242824",
        night: "#171917",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: { page: "1216px" },
    },
  },
  plugins: [],
};

export default config;
