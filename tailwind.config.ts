import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '64': '64px',
        '96': '96px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'purple': '#ac85f2',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 10s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
