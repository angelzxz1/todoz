import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				button: 'inset -0.5rem -0.5rem 0.75rem 0.05rem',
			},
			height: {
				'nav-screen': 'calc(100vh - 0rem)',
			},
			animation: {
				xMove: 'xMove 1s ease-in-out infinite',
			},
			keyframes: {
				xMove: {
					'0%': {
						left: '-100%',
					},
					'100%': {
						left: '100%',
					},
				},
			},
			colors: {
				grayBlue: {
					light: '#7A8696',
					core: '#5B6470',
					dark: '#3C424A',
				},
				darkBlue: {
					light: '#140464',
					core: '#16044B',
					dark: '#0B0225',
				},
				darkPurple: {
					light: '#8E78BA',
					core: '#54476E',
					dark: '#372F48',
				},
				warningRed: {
					light: '#FF5C5C',
					core: '#FF2850',
					dark: '#a0152e',
				},
				alertOrange: {
					light: '#FF9E37',
					core: '#FF9037',
					dark: '#F67F36',
				},
				goGreen: {
					light: '#34FFCA',
					core: '#34FFBC',
					dark: '#2EE09A',
				},
				skyBlue: {
					light: '#a7ebff',
					core: '#95d7e3',
					dark: '#73a6b0',
				},
				lila: {
					light: '#c2b8ff',
					core: '#b8c0ff',
					dark: '#9399cc',
				},
				tan: {
					light: '#ffe4c5',
					core: '#dabda9',
					dark: '#a69081',
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
