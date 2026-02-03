import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        // Trust Authority + Conversion Color System
        background: '#F9FAFB',
        foreground: '#2E2E2E',
        
        // Primary - CDH Navy (Trust & Authority)
        navy: {
          DEFAULT: '#0B1F3A',
          light: '#142d4f',
          dark: '#081529',
        },
        
        // Secondary - Off-White (Clarity & Comfort)
        offwhite: '#F9FAFB',
        
        // Accent - Conversion Orange (CTA Trigger)
        orange: {
          DEFAULT: '#FF7A18',
          hover: '#E96A0F',
          light: '#FF9A4D',
        },
        
        // Support - Charcoal (Professional Grounding)
        charcoal: '#2E2E2E',
        
        // Muted UI - Slate Gray
        slate: '#6B7280',
        
        // Legacy mappings for compatibility
        primary: {
          DEFAULT: '#0B1F3A',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#6B7280',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F3F4F6',
          foreground: '#6B7280',
        },
        accent: {
          orange: '#FF7A18',
          DEFAULT: '#FF7A18',
        },
        border: '#E5E7EB',
        ring: '#0B1F3A',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'count-up': {
          '0%': { '--num': '0' },
          '100%': { '--num': 'var(--target)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.8s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
