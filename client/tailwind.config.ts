import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	extend: {
    		fontFamily: {
    			sans: ["var(--font-geist-sans)"],
    			mono: ["var(--font-geist-mono)"]
    		},
    		colors: {
    			background: 'var(--background)',
    			foreground: 'var(--foreground)',
    			theme: '#111111'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		animation: {
    			'shiny-text': 'shiny-text 8s infinite',
    			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
    			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite'
    		},
    		keyframes: {
    			'shiny-text': {
    				'0%, 90%, 100%': {
    					'background-position': 'calc(-100% - var(--shiny-width)) 0'
    				},
    				'30%, 60%': {
    					'background-position': 'calc(100% + var(--shiny-width)) 0'
    				}
    			},
    			'border-beam': {
    				'100%': {
    					'offset-distance': '100%'
    				}
    			},
    			ripple: {
    				'0%, 100%': {
    					transform: 'translate(-50%, -50%) scale(1)'
    				},
    				'50%': {
    					transform: 'translate(-50%, -50%) scale(0.9)'
    				}
    			}
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
