/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Notice, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	ColorPickerErrorBoundary,
	SimpleColorPicker,
	normalizeHexColor,
} from './color-picker-preview';
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import { resolveComponent } from '../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'color-picker', blockJson );

const ColorPickerComponent = resolveComponent(
	'ColorPicker',
	'__experimentalColorPicker'
);

const DEFAULT_COLOR = '#72aee6';

/**
 * Full wp.components.ColorPicker needs a recent useCopyToClipboard (WP 6.8+).
 *
 * @return {boolean} Whether the full core ColorPicker can be used safely.
 */
function supportsFullColorPicker() {
	const version = window.wp?.version ?? '';
	const [ major, minor = 0 ] = version
		.split( '.' )
		.map( ( part ) => parseInt( part, 10 ) );
	return (
		Number.isFinite( major ) &&
		( major > 6 || ( major === 6 && minor >= 8 ) )
	);
}

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { color, enableAlpha } = attributes;
	const displayColor =
		typeof color === 'string' && color ? color : DEFAULT_COLOR;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-color-picker-block',
	} );

	const handleChange = ( nextColor ) => {
		setAttributes( { color: nextColor ?? DEFAULT_COLOR } );
	};

	const fallback = (
		<>
			<Notice status="info" isDismissible={ false }>
				{ __(
					'Showing a simplified color picker preview. The full ColorPicker component requires a recent WordPress version.',
					'blocks-preview'
				) }
			</Notice>
			<SimpleColorPicker
				color={ displayColor }
				enableAlpha={ enableAlpha }
				onChange={ handleChange }
			/>
		</>
	);

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'ColorPicker options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ColorPicker documentation',
					'blocks-preview'
				) }
			>
				<ToggleControl
					label={ __( 'Enable alpha', 'blocks-preview' ) }
					checked={ enableAlpha }
					onChange={ ( nextEnableAlpha ) =>
						setAttributes( { enableAlpha: nextEnableAlpha } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ ColorPickerComponent && supportsFullColorPicker() ? (
					<ColorPickerErrorBoundary fallback={ fallback }>
						<ColorPickerComponent
							color={ normalizeHexColor( displayColor ) }
							defaultValue={ DEFAULT_COLOR }
							enableAlpha={ enableAlpha }
							onChange={ handleChange }
						/>
					</ColorPickerErrorBoundary>
				) : (
					fallback
				) }
			</div>
		</>
	);
}
