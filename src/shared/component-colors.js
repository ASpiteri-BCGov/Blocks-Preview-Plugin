/**
 * Shared color palette for border-related component previews.
 */
export const COMPONENT_COLOR_PALETTE = [
	{ name: 'Blue 20', color: '#72aee6' },
	{ name: 'Red 40', color: '#e65054' },
	{ name: 'Green 30', color: '#68de7c' },
	{ name: 'Yellow 10', color: '#f2d675' },
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
