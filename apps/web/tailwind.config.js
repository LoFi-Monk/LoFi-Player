/** @type {import('tailwindcss').Config} */
const sharedConfig = require("../../packages/ui/tailwind.config");

module.exports = {
	darkMode: ["class"],
	presets: [sharedConfig],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"../../packages/ui/src/**/*.{js,ts,jsx,tsx}" // Scan UI package for utility classes
	],
	theme: {
		extend: {
			colors: {
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			}
		}
	}
}
