/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#08090f",
          card: "rgba(16, 20, 35, 0.75)",
          border: "rgba(34, 197, 94, 0.2)",
          green: "#22c55e",
          blue: "#06b6d4",
          red: "#ef4444",
          yellow: "#eab308",
          glow: "rgba(34, 197, 94, 0.15)",
        }
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(34, 197, 94, 0.2), 0 0 10px rgba(34, 197, 94, 0.1)' },
          '100%': { boxShadow: '0 0 15px rgba(34, 197, 94, 0.6), 0 0 25px rgba(34, 197, 94, 0.3)' },
        }
      }
    },
  },
  plugins: [],
}
