/**
 * Shared color palette for border-related component previews.
 */
export const COMPONENT_COLOR_PALETTE = [
	{ name: 'Blue 20', color: '#72aee6', slug: 'blue-20' },
	{ name: 'Red 40', color: '#e65054', slug: 'red-40' },
	{ name: 'Green 30', color: '#68de7c', slug: 'green-30' },
	{ name: 'Yellow 10', color: '#f2d675', slug: 'yellow-10' },
];

/** Presets for DuotonePicker (see component docs). */
export const DUOTONE_PALETTE = [
	{
		colors: [ '#8c00b7', '#fcff41' ],
		name: 'Purple and yellow',
		slug: 'purple-yellow',
	},
	{
		colors: [ '#000097', '#ff4747' ],
		name: 'Blue and red',
		slug: 'blue-red',
	},
	{
		colors: [ '#000000', '#ffffff' ],
		name: 'Grayscale',
		slug: 'grayscale',
	},
	{
		colors: [ '#72aee6', '#e65054' ],
		name: 'Blue and red (theme)',
		slug: 'blue-red-theme',
	},
];

export const DEFAULT_BORDER_SIDE = {
	color: '#72aee6',
	style: 'dashed',
	width: '1px',
};

export const DEFAULT_BORDER_BOX_VALUE = {
	top: DEFAULT_BORDER_SIDE,
	right: DEFAULT_BORDER_SIDE,
	bottom: DEFAULT_BORDER_SIDE,
	left: DEFAULT_BORDER_SIDE,
};

export const DEFAULT_BORDER_CONTROL_VALUE = {
	color: '#72aee6',
	style: 'solid',
	width: '2px',
};

export const DEFAULT_BOX_CONTROL_VALUES = {
	top: '50px',
	right: '10%',
	bottom: '50px',
	left: '10%',
};
