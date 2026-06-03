/**
 * Formats a border value object for static save output.
 *
 * @param {Object|undefined} value Border value from BorderControl or BorderBoxControl.
 * @return {string} Human-readable border summary for static save output.
 */
export function formatBorderValue( value ) {
	if ( ! value || typeof value !== 'object' ) {
		return '';
	}

	if ( value.color || value.style || value.width ) {
		return [ value.color, value.style, value.width ]
			.filter( Boolean )
			.join( ' / ' );
	}

	return Object.entries( value )
		.map( ( [ side, border ] ) => {
			if ( ! border || typeof border !== 'object' ) {
				return '';
			}
			return `${ side }: ${ [ border.color, border.style, border.width ]
				.filter( Boolean )
				.join( ' ' ) }`;
		} )
		.filter( Boolean )
		.join( '; ' );
}
