/**
 * Demo completer from the Autocomplete component docs.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/autocomplete/
 */
export const FRUIT_COMPLETER = {
	name: 'fruit',
	triggerPrefix: '~',
	options: [
		{ visual: '🍎', name: 'Apple', id: 1 },
		{ visual: '🍊', name: 'Orange', id: 2 },
		{ visual: '🍇', name: 'Grapes', id: 3 },
		{ visual: '🥭', name: 'Mango', id: 4 },
		{ visual: '🍓', name: 'Strawberry', id: 5 },
		{ visual: '🫐', name: 'Blueberry', id: 6 },
		{ visual: '🍒', name: 'Cherry', id: 7 },
	],
	getOptionLabel: ( option ) => `${ option.visual } ${ option.name }`,
	getOptionKeywords: ( option ) => [ option.name ],
	isOptionDisabled: ( option ) => option.name === 'Grapes',
	getOptionCompletion: ( option ) => option.visual,
};
