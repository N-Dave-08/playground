import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: '#ff79c7',
  			'primary-content': '#16050f',
  			secondary: '#bd93f9',
  			'secondary-content': '#0c0816',
  			accent: '#ffb86c',
  			'accent-content': '#160c03',
  			neutral: '#404558',
  			'neutral-content': '#d6d7db',
  			info: '#8ae9fc',
  			'info-content': '#071317',
  			success: '#4ffb7b',
  			'success-content': '#021404',
  			warning: '#f0fb8d',
  			'warning-content': '#141507',
  			error: '#ff5555',
  			'error-content': '#404558',
  			'base-100': '#282a36',
  			'base-200': '#232531',
  			'base-300': '#20202a',
  			'base-content': '#f7f8f2'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
