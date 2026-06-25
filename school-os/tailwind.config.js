/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },

    extend: {
      colors: {
        primary: "#2563EB",
        primaryDark: "#2a52d5",
        primaryLight: "#DBEAFE",

        background: "#F8FAFC",
        surface: "#FFFFFF",

        textPrimary: "#0F172A",
        textSecondary: "#475569",

        border: "#E2E8F0",

        success: "#16A34A",
        warning: "#F59E0B",
        error: "#DC2626",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.06)",
      },

      borderRadius: {
        xl2: "1rem",
      },
    },
  },

  plugins: [],
};

