// You can also use the generator at https://skeleton.dev/docs/generator to create these values for you
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
export const evift: CustomThemeConfig = {
	name: 'evift',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Roboto, sans-serif`,
		'--theme-font-family-heading': `Roboto, sans-serif`,
		'--theme-font-color-base': 'var(--color-surface-500)',
		'--theme-font-color-dark': 'var(--color-tertiary-500)',
		'--theme-rounded-base': '12px',
		'--theme-rounded-container': '12px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': 'var(--color-surface-500)',
		'--on-secondary': 'var(--color-surface-500)',
		'--on-tertiary': 'var(--color-surface-500)',
		'--on-success': 'var(--color-tertiary-500)',
		'--on-warning': 'var(--color-tertiary-500)',
		'--on-error': 'var(--color-surface-500)',
		'--on-surface': 'var(--color-tertiary-500)',
		// =~= Theme Colors  =~=
		// primary | #006494
		'--color-primary-50': '217 232 239', // #d9e8ef
		'--color-primary-100': '204 224 234', // #cce0ea
		'--color-primary-200': '191 216 228', // #bfd8e4
		'--color-primary-300': '153 193 212', // #99c1d4
		'--color-primary-400': '77 147 180', // #4d93b4
		'--color-primary-500': '0 100 148', // #006494
		'--color-primary-600': '0 90 133', // #005a85
		'--color-primary-700': '0 75 111', // #004b6f
		'--color-primary-800': '0 60 89', // #003c59
		'--color-primary-900': '0 49 73', // #003149
		// secondary | #A3009C
		'--color-secondary-50': '241 217 240', // #f1d9f0
		'--color-secondary-100': '237 204 235', // #edcceb
		'--color-secondary-200': '232 191 230', // #e8bfe6
		'--color-secondary-300': '218 153 215', // #da99d7
		'--color-secondary-400': '191 77 186', // #bf4dba
		'--color-secondary-500': '163 0 156', // #A3009C
		'--color-secondary-600': '147 0 140', // #93008c
		'--color-secondary-700': '122 0 117', // #7a0075
		'--color-secondary-800': '98 0 94', // #62005e
		'--color-secondary-900': '80 0 76', // #50004c
		// tertiary | #051923
		'--color-tertiary-50': '218 221 222', // #daddde
		'--color-tertiary-100': '205 209 211', // #cdd1d3
		'--color-tertiary-200': '193 198 200', // #c1c6c8
		'--color-tertiary-300': '155 163 167', // #9ba3a7
		'--color-tertiary-400': '80 94 101', // #505e65
		'--color-tertiary-500': '5 25 35', // #051923
		'--color-tertiary-600': '5 23 32', // #051720
		'--color-tertiary-700': '4 19 26', // #04131a
		'--color-tertiary-800': '3 15 21', // #030f15
		'--color-tertiary-900': '2 12 17', // #020c11
		// success | #419400
		'--color-success-50': '227 239 217', // #e3efd9
		'--color-success-100': '217 234 204', // #d9eacc
		'--color-success-200': '208 228 191', // #d0e4bf
		'--color-success-300': '179 212 153', // #b3d499
		'--color-success-400': '122 180 77', // #7ab44d
		'--color-success-500': '65 148 0', // #419400
		'--color-success-600': '59 133 0', // #3b8500
		'--color-success-700': '49 111 0', // #316f00
		'--color-success-800': '39 89 0', // #275900
		'--color-success-900': '32 73 0', // #204900
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #940013
		'--color-error-50': '239 217 220', // #efd9dc
		'--color-error-100': '234 204 208', // #eaccd0
		'--color-error-200': '228 191 196', // #e4bfc4
		'--color-error-300': '212 153 161', // #d499a1
		'--color-error-400': '180 77 90', // #b44d5a
		'--color-error-500': '148 0 19', // #940013
		'--color-error-600': '133 0 17', // #850011
		'--color-error-700': '111 0 14', // #6f000e
		'--color-error-800': '89 0 11', // #59000b
		'--color-error-900': '73 0 9', // #490009
		// surface | #E0E0E0
		'--color-surface-50': '250 250 250', // #fafafa
		'--color-surface-100': '249 249 249', // #f9f9f9
		'--color-surface-200': '247 247 247', // #f7f7f7
		'--color-surface-300': '243 243 243', // #f3f3f3
		'--color-surface-400': '233 233 233', // #e9e9e9
		'--color-surface-500': '224 224 224', // #E0E0E0
		'--color-surface-600': '202 202 202', // #cacaca
		'--color-surface-700': '168 168 168', // #a8a8a8
		'--color-surface-800': '134 134 134', // #868686
		'--color-surface-900': '110 110 110' // #6e6e6e
	}
};
