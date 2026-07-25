import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070909",
        mint: "#76f0bf",
        teal: "#2dd4bf",
      },
    },
  },
} satisfies Config;
