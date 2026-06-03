/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const DEFAULT_COLOR = '#72aee6';

/**
 * Normalizes a hex color string for the native color input (no alpha).
 *
 * @param {unknown} color Attribute value.
 * @return {string} Six-digit hex with leading #.
 */
export function normalizeHexColor( color ) {
	if ( typeof color !== 'string' || ! color.startsWith( '#' ) ) {
		return DEFAULT_COLOR;
	}
	const hex = color.replace( '#', '' ).slice( 0, 6 );
	return `#${ hex.padEnd( 6, '0' ) }`;
}

/**
 * Simplified color picker when wp.components.ColorPicker is unavailable or crashes.
 *
 * @param {Object}   props
 * @param {string}   props.color       Current color (hex or hex8).
 * @param {boolean}  props.enableAlpha Whether alpha is enabled in settings.
 * @param {Function} props.onChange    Called with the next color string.
 */
export function SimpleColorPicker( { color, enableAlpha, onChange } ) {
	const displayColor =
		typeof color === 'string' && color ? color : DEFAULT_COLOR;
	const swatchColor = normalizeHexColor( displayColor );

	return (
		<div className="blocks-preview-color-picker-block__simple">
			<div className="blocks-preview-color-picker-block__swatch-row">
				<span className="blocks-preview-color-picker-block__swatch">
					<input
						type="color"
						className="blocks-preview-color-picker-block__native-input"
						value={ swatchColor }
						aria-label={ __( 'Pick color', 'blocks-preview' ) }
						onChange={ ( event ) => onChange( event.target.value ) }
					/>
				</span>
				<span>{ __( 'Pick color', 'blocks-preview' ) }</span>
			</div>
			<TextControl
				label={
					enableAlpha
						? __( 'Color (hex or hex8)', 'blocks-preview' )
						: __( 'Color (hex)', 'blocks-preview' )
				}
				value={ displayColor }
				onChange={ ( nextColor ) => onChange( nextColor ?? '' ) }
				help={
					enableAlpha
						? __(
								'Simplified preview — full ColorPicker requires a recent WordPress version.',
								'blocks-preview'
						  )
						: undefined
				}
			/>
		</div>
	);
}

/**
 * Catches ColorPicker failures (e.g. older useCopyToClipboard in core).
 */
export class ColorPickerErrorBoundary extends Component {
	constructor( props ) {
		super( props );
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		if ( this.state.hasError ) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}
