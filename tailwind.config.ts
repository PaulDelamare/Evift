import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { evift } from './src/evift';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			fontFamily: {
				condensed: ['Roboto Condensed', 'sans-serif'],
				slab: ['Roboto Slab', 'serif'],
				roboto: ['Roboto', 'sans-serif'],
				akshar: ['Akshar', 'sans-serif'],
				leckerli: ['Leckerli One', 'cursive'],
				aoboshi: ['Aoboshi One', 'cursive']
			},
			colors: {
				'light-blue': {
					50: '#f0f9ff',
					100: '#e0f1fe',
					200: '#bbe4fc',
					300: '#7fcffa',
					400: '#3bb7f5',
					500: '#119fe6',
					600: '#0582ca',
					700: '#05649f',
					800: '#095583',
					900: '#0d486d',
					950: '#092d48'
				}
			},
			screens: {
				'mini-desk': { raw: '(max-width: 1150px)' },
				'tablet': { raw: '(max-width: 850px)' },
				'mini-tablet': { raw: '(max-width: 640px)' },
				'mini-tablet-min': { raw: '(min-width: 641px)' },
				'mobile-large': { raw: '(max-width: 430px)' }
			},
			backgroundImage: {
				'gradient': 'linear-gradient(250deg, rgb(var(--color-secondary-500) / var(--tw-text-opacity)) 15%, rgba(17,159,230,1) 100%)',
				'secondaryGradient': 'linear-gradient(240deg, rgb(var(--color-secondary-500) / var(--tw-text-opacity)) 0%, rgb(var(--color-primary-500) / var(--tw-text-opacity)) 65%, rgba(59,183,245,1) 100%)'
			},
			ringColor: {
				'gradient': 'linear-gradient(250deg, rgb(var(--color-secondary-500) / var(--tw-text-opacity)) 15%, rgba(17,159,230,1) 100%)',
				'secondaryGradient': 'linear-gradient(240deg, rgb(var(--color-secondary-500) / var(--tw-text-opacity)) 0%, rgb(var(--color-primary-500) / var(--tw-text-opacity)) 65%, rgba(59,183,245,1) 100%)'
			},
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [evift]
			}
		})
	]
} satisfies Config;
