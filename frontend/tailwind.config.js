/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Remove if not using App Router: "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        secondary: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#007BFF',       // Bright Blue - trust, reliability, clarity
          secondary: '#52A0FF',     // Lighter Blue - supporting color
          accent: '#28A745',        // Vibrant Green - growth, fairness, positivity
        },
        neutral: {
          'light-gray': '#F8F9FA',
          'border-gray': '#E9ECEF',
          'placeholder-gray': '#CED4DA',
          'text-gray': '#6C757D', // Added a mid-gray for less prominent text
          'dark-gray': '#495057', // Dark Gray text
          'very-dark-gray': '#212529', // Very Dark Gray headings
        },
        status: {
          success: '#28A745', // Green
          warning: '#FFC107', // Yellow
          error: '#DC3545',   // Red
        },
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px', // Default for most elements like inputs, buttons
        'md': '8px',
        'lg': '12px', // For larger cards or modals
        'xl': '16px',
        'card': '12px', // Specifically for cards
      },
      boxShadow: { // Added based on summary
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'modal': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'), // Added based on summary
  ],
};

module.exports = config;
